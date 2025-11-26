import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { seedDatabase } from "./seed";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "./_core/notification";
import * as smartNotifications from "./smartNotifications";
import * as invoiceGenerator from "./invoiceGenerator";
import * as moyasar from "./moyasarIntegration";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

// Technician procedure
const technicianProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const technician = await db.getTechnicianByUserId(ctx.user.id);
  if (!technician) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Technician access required' });
  }
  return next({ ctx: { ...ctx, technician } });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Devices and Services
  devices: router({
    getTypes: publicProcedure.query(async () => {
      return await db.getAllDeviceTypes();
    }),
    
    getModels: publicProcedure
      .input(z.object({ deviceTypeId: z.number() }))
      .query(async ({ input }) => {
        return await db.getDeviceModelsByType(input.deviceTypeId);
      }),
  }),

  services: router({
    getTypes: publicProcedure.query(async () => {
      return await db.getAllServiceTypes();
    }),
    
    getPrice: publicProcedure
      .input(z.object({
        deviceModelId: z.number(),
        serviceTypeId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getServicePrice(input.deviceModelId, input.serviceTypeId);
      }),
  }),

  // Service Requests
  requests: router({
    create: protectedProcedure
      .input(z.object({
        deviceModelId: z.number(),
        serviceTypeId: z.number(),
        serviceMode: z.enum(['express', 'pickup']),
        paymentMethod: z.enum(['cash_on_delivery', 'bank_transfer']).default('cash_on_delivery'),
        issueDescription: z.string().optional(),
        address: z.string(),
        city: z.string(),
        country: z.string().default('Saudi Arabia'),
        phoneNumber: z.string(),
        preferredDate: z.date().optional(),
        preferredTimeSlot: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Get pricing
        const pricing = await db.getServicePrice(input.deviceModelId, input.serviceTypeId);
        if (!pricing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Service pricing not found' });
        }

        const requestId = await db.createServiceRequest({
          userId: ctx.user.id,
          deviceModelId: input.deviceModelId,
          serviceTypeId: input.serviceTypeId,
          pricingId: pricing.id,
          serviceMode: input.serviceMode,
          issueDescription: input.issueDescription,
          address: input.address,
          city: input.city,
          country: input.country,
          phoneNumber: input.phoneNumber,
          preferredDate: input.preferredDate,
          preferredTimeSlot: input.preferredTimeSlot,
          totalAmount: pricing.priceInSAR,
          status: 'pending',
          paymentStatus: 'pending',
        });

        // Notify owner about new request
        await notifyOwner({
          title: 'طلب صيانة جديد',
          content: `تم استلام طلب صيانة جديد من ${ctx.user.name || 'عميل'} في ${input.city}`,
        });

        // Send push notification to user
        await smartNotifications.notifyNewRequest(ctx.user.id, Number(requestId));

        return { success: true };
      }),

    getUserRequests: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserServiceRequests(ctx.user.id);
    }),

    getById: protectedProcedure
      .input(z.object({ requestId: z.number() }))
      .query(async ({ ctx, input }) => {
        const request = await db.getRequestById(input.requestId);
        if (!request) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }

        // Check access: user owns request, or is technician assigned, or is admin
        const technician = await db.getTechnicianByUserId(ctx.user.id);
        const isOwner = request.userId === ctx.user.id;
        const isAssignedTechnician = technician && request.technicianId === technician.id;
        const isAdmin = ctx.user.role === 'admin';

        if (!isOwner && !isAssignedTechnician && !isAdmin) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
        }

        return request;
      }),
  }),

  // Technician routes
  technician: router({
    getProfile: technicianProcedure.query(async ({ ctx }) => {
      return ctx.technician;
    }),

    getMyRequests: technicianProcedure.query(async ({ ctx }) => {
      return await db.getRequestsByTechnicianId(ctx.technician.id);
    }),

    updateRequestStatus: technicianProcedure
      .input(z.object({
        requestId: z.number(),
        status: z.enum(['in_progress', 'completed']),
      }))
      .mutation(async ({ ctx, input }) => {
        const request = await db.getRequestById(input.requestId);
        if (!request) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }

        if (request.technicianId !== ctx.technician.id) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Not assigned to this request' });
        }

        if (input.status === 'completed') {
          await db.completeRequest(input.requestId);
          
          // Update technician stats
          const updatedStats = {
            completedJobs: ctx.technician.completedJobs + 1,
            rating: ctx.technician.rating || 0,
          };
          await db.updateTechnicianStats(ctx.technician.id, updatedStats.completedJobs, updatedStats.rating);

          // Notify owner
          await notifyOwner({
            title: 'تم إكمال طلب صيانة',
            content: `أكمل الفني ${ctx.technician.nameAr} طلب الصيانة رقم #${input.requestId}`,
          });
        } else {
          await db.updateRequestStatus(input.requestId, input.status);
        }

        return { success: true };
      }),
  }),

  // Admin routes
  admin: router({
    seedDatabase: adminProcedure.mutation(async () => {
      await seedDatabase();
      return { success: true };
    }),

    getAllRequests: adminProcedure.query(async () => {
      return await db.getAllRequests();
    }),

    getAllTechnicians: adminProcedure.query(async () => {
      return await db.getAllActiveTechnicians();
    }),

    assignTechnician: adminProcedure
      .input(z.object({
        requestId: z.number(),
        technicianId: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.assignTechnicianToRequest(input.requestId, input.technicianId);
        
        const request = await db.getRequestById(input.requestId);
        if (!request) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }
        
        const technician = await db.getTechnicianByUserId(input.technicianId);
        
        // Notify owner
        await notifyOwner({
          title: 'تم تعيين فني',
          content: `تم تعيين الفني ${technician?.nameAr || 'فني'} للطلب رقم #${input.requestId}`,
        });

        return { success: true };
      }),

    updateRequestStatus: adminProcedure
      .input(z.object({
        requestId: z.number(),
        status: z.enum(['pending', 'confirmed', 'technician_assigned', 'in_progress', 'completed', 'cancelled']),
      }))
      .mutation(async ({ input }) => {
        await db.updateRequestStatus(input.requestId, input.status);
        return { success: true };
      }),

    createTechnician: adminProcedure
      .input(z.object({
        userId: z.number(),
        nameAr: z.string(),
        nameEn: z.string(),
        phoneNumber: z.string(),
        specialization: z.string().optional(),
        city: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.createTechnician({
          ...input,
          isActive: 1,
          rating: 0,
          completedJobs: 0,
        });
        return { success: true };
      }),

    getPendingPayments: adminProcedure.query(async () => {
      return await db.getAllPendingPaymentReceipts();
    }),

    approvePayment: adminProcedure
      .input(z.object({
        receiptId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updatePaymentReceiptStatus(input.receiptId, 'approved', ctx.user.id);
        return { success: true };
      }),

    rejectPayment: adminProcedure
      .input(z.object({
        receiptId: z.number(),
        reason: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updatePaymentReceiptStatus(input.receiptId, 'rejected', ctx.user.id, input.reason);
        return { success: true };
      }),
  }),

  // Reviews
  reviews: router({
    create: protectedProcedure
      .input(z.object({
        requestId: z.number(),
        rating: z.number().min(1).max(5),
        reviewText: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const request = await db.getRequestById(input.requestId);
        if (!request) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }

        if (request.userId !== ctx.user.id) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Not your request' });
        }

        if (request.status !== 'completed') {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Request not completed yet' });
        }

        if (!request.technicianId) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'No technician assigned' });
        }

        // Check if already reviewed
        const existing = await db.getReviewByRequestId(input.requestId);
        if (existing) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Already reviewed' });
        }

        await db.createReview({
          serviceRequestId: input.requestId,
          userId: ctx.user.id,
          technicianId: request.technicianId,
          rating: input.rating * 100, // Store as 100-500
          reviewText: input.reviewText,
        });

        // Update technician's average rating
        await db.updateTechnicianRating(request.technicianId);

        return { success: true };
      }),

    getByTechnician: publicProcedure
      .input(z.object({ technicianId: z.number() }))
      .query(async ({ input }) => {
        return await db.getReviewsByTechnicianId(input.technicianId);
      }),

    getByRequest: protectedProcedure
      .input(z.object({ requestId: z.number() }))
      .query(async ({ input }) => {
        return await db.getReviewByRequestId(input.requestId);
      }),
  }),

  // Payment
  payment: router({
    uploadReceipt: protectedProcedure
      .input(z.object({
        requestId: z.number(),
        receiptImageUrl: z.string(),
        receiptImageKey: z.string(),
        amount: z.number(),
        transferDate: z.date().optional(),
        bankName: z.string().optional(),
        accountNumber: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const request = await db.getRequestById(input.requestId);
        if (!request) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }

        if (request.userId !== ctx.user.id) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Not your request' });
        }

        // Check if already uploaded
        const existing = await db.getPaymentReceiptByRequestId(input.requestId);
        if (existing) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Receipt already uploaded' });
        }

        await db.createPaymentReceipt({
          serviceRequestId: input.requestId,
          userId: ctx.user.id,
          receiptImageUrl: input.receiptImageUrl,
          receiptImageKey: input.receiptImageKey,
          amount: input.amount,
          transferDate: input.transferDate,
          bankName: input.bankName,
          accountNumber: input.accountNumber,
          status: 'pending',
        });

        // Notify owner
        await notifyOwner({
          title: 'إيصال دفع جديد',
          content: `تم رفع إيصال دفع جديد للطلب رقم #${input.requestId} من ${ctx.user.name || 'عميل'}`,
        });

        return { success: true };
      }),

    getReceipt: protectedProcedure
      .input(z.object({ requestId: z.number() }))
      .query(async ({ input }) => {
        return await db.getPaymentReceiptByRequestId(input.requestId);
      }),
  }),

  // Coupons
  coupons: router({
    validate: publicProcedure
      .input(z.object({
        code: z.string(),
        orderAmount: z.number(),
      }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        return await db.validateCoupon(input.code, ctx.user.id, input.orderAmount);
      }),

    getAll: adminProcedure.query(async () => {
      return await db.getAllCoupons();
    }),

    create: adminProcedure
      .input(z.object({
        code: z.string(),
        discountType: z.enum(['percentage', 'fixed']),
        discountValue: z.number(),
        minOrderAmount: z.number().optional(),
        maxDiscountAmount: z.number().optional(),
        usageLimit: z.number().optional(),
        userUsageLimit: z.number().default(1),
        validFrom: z.date(),
        validUntil: z.date(),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createCoupon({
          ...input,
          isActive: 1,
          usageCount: 0,
          createdBy: ctx.user.id,
        });
        return { success: true };
      }),
  }),

  // Location Tracking
  location: router({
    update: protectedProcedure
      .input(z.object({
        technicianId: z.number(),
        serviceRequestId: z.number().optional(),
        latitude: z.string(),
        longitude: z.string(),
        accuracy: z.number().optional(),
        heading: z.number().optional(),
        speed: z.number().optional(),
        isOnRoute: z.boolean().default(false),
        estimatedArrival: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.updateTechnicianLocation({
          ...input,
          isOnRoute: input.isOnRoute ? 1 : 0,
        });
        return { success: true };
      }),

    getLatest: publicProcedure
      .input(z.object({ technicianId: z.number() }))
      .query(async ({ input }) => {
        return await db.getLatestTechnicianLocation(input.technicianId);
      }),

    getForRequest: protectedProcedure
      .input(z.object({ requestId: z.number() }))
      .query(async ({ input }) => {
        return await db.getTechnicianLocationForRequest(input.requestId);
      }),
  }),

  // Push Notifications
  push: router({
    subscribe: protectedProcedure
      .input(z.object({
        endpoint: z.string(),
        p256dh: z.string(),
        auth: z.string(),
        userAgent: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.savePushSubscription({
          userId: ctx.user.id,
          ...input,
          isActive: 1,
        });
        return { success: true };
      }),

    unsubscribe: protectedProcedure
      .input(z.object({ endpoint: z.string() }))
      .mutation(async ({ input }) => {
        await db.deletePushSubscription(input.endpoint);
        return { success: true };
      }),
  }),

  // Chat System
  chat: router({
    createRoom: protectedProcedure
      .input(z.object({
        serviceRequestId: z.number(),
        technicianId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const roomId = await db.createChatRoom({
          serviceRequestId: input.serviceRequestId,
          customerId: ctx.user.id,
          technicianId: input.technicianId,
        });
        return { roomId };
      }),

    getRoom: protectedProcedure
      .input(z.object({ requestId: z.number() }))
      .query(async ({ input }) => {
        return await db.getChatRoomByRequestId(input.requestId);
      }),

    getMyRooms: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getChatRoomsByUserId(ctx.user.id);
      }),

    sendMessage: protectedProcedure
      .input(z.object({
        chatRoomId: z.number(),
        content: z.string(),
        messageType: z.enum(["text", "image"]).default("text"),
        imageUrl: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const messageId = await db.sendMessage({
          chatRoomId: input.chatRoomId,
          senderId: ctx.user.id,
          content: input.content,
          messageType: input.messageType,
          imageUrl: input.imageUrl,
          isRead: 0,
        });
        return { messageId };
      }),

    getMessages: protectedProcedure
      .input(z.object({
        roomId: z.number(),
        limit: z.number().optional(),
      }))
      .query(async ({ input }) => {
        return await db.getMessagesByRoomId(input.roomId, input.limit);
      }),

    markAsRead: protectedProcedure
      .input(z.object({ roomId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.markMessagesAsRead(input.roomId, ctx.user.id);
        return { success: true };
      }),

    // AI Chatbot
    sendChatbotMessage: publicProcedure
      .input(z.object({
        message: z.string(),
        language: z.enum(["ar", "en"]).default("ar"),
      }))
      .mutation(async ({ input }) => {
        const { invokeLLM } = await import("./_core/llm");
        
        const systemPrompt = input.language === "ar"
          ? `أنت مساعد ذكي لشركة Fixate المتخصصة في صيانة الأجهزة الإلكترونية.

معلومات عن Fixate:
- نحن شركة سعودية متخصصة في صيانة الأجهزة الإلكترونية (جوالات، لابتوبات، تابلت)
- نمتلك فريقاً من الفنيين المحترفين وأسطولاً من العربات المجهزة بالكامل
- نقدم خدمة صيانة متنقلة حيث يصل الفني إلى منزل العميل، يستلم الجهاز، ويقوم بإصلاحه في العربة المجهزة
- نوفر تتبع موقع الفني في الوقت الفعلي على الخريطة
- أسعارنا تبدأ من 150 ريال للخدمات البسيطة
- نقدم ضمان 90 يوم على جميع الإصلاحات
- نعمل في جميع مدن المملكة

مهمتك:
- الرد على أسئلة العملاء بشكل ودود واحترافي
- مساعدة العملاء في حجز المواعيد وتتبع الطلبات
- الإجابة على الأسئلة الشائعة
- توجيه العملاء للصفحات المناسبة

كن مختصراً ومفيداً في إجاباتك.`
          : `You are an AI assistant for Fixate, a specialized electronic device repair company.

About Fixate:
- We are a Saudi company specialized in electronic device repair (phones, laptops, tablets)
- We own a team of professional technicians and a fleet of fully-equipped mobile repair vans
- We provide on-site repair service where the technician arrives at the customer's home, collects the device, and repairs it in the equipped van
- We offer real-time technician location tracking on the map
- Our prices start from 150 SAR for basic services
- We provide a 90-day warranty on all repairs
- We operate in all cities across Saudi Arabia

Your role:
- Answer customer questions in a friendly and professional manner
- Help customers book appointments and track orders
- Answer frequently asked questions
- Guide customers to the appropriate pages

Be concise and helpful in your responses.`;

        try {
          const response = await invokeLLM({
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: input.message },
            ],
          });

          return {
            response: response.choices[0]?.message?.content || (input.language === "ar" ? "عذراً، لم أتمكن من فهم سؤالك. يرجى المحاولة مرة أخرى." : "Sorry, I couldn't understand your question. Please try again."),
          };
        } catch (error) {
          console.error("AI Chatbot error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: input.language === "ar" ? "حدث خطأ في الخادم" : "Server error occurred",
          });
        }
      }),
  }),

  // Loyalty Points
  loyalty: router({
    getPoints: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserLoyaltyPoints(ctx.user.id);
      }),

    getTransactions: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getPointsTransactions(ctx.user.id, input.limit);
      }),

    redeemPoints: protectedProcedure
      .input(z.object({
        points: z.number(),
        description: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.redeemPoints(ctx.user.id, input.points, input.description);
        return { success: true };
      }),
  }),

  // Rewards
  rewards: router({
    getAll: publicProcedure
      .query(async () => {
        return await db.getAllRewards();
      }),
  }),

  // Invoices
  invoices: router({
    generate: protectedProcedure
      .input(z.object({ requestId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const request = await db.getRequestById(input.requestId);
        if (!request || request.userId !== ctx.user.id) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }

        const invoiceNumber = invoiceGenerator.generateInvoiceNumber(request.id);
        
        const invoiceData = {
          invoiceNumber,
          invoiceDate: new Date(),
          companyName: 'Fixate',
          companyAddress: 'الرياض، المملكة العربية السعودية',
          companyPhone: '+966 XX XXX XXXX',
          companyEmail: 'support@fixate.sa',
          companyTaxId: '123456789',
          customerName: ctx.user.name || 'عميل',
          customerEmail: ctx.user.email || '',
          customerPhone: request.phoneNumber,
          customerAddress: request.address,
          serviceDescription: request.issueDescription || 'وصف الخدمة',
          deviceModel: 'Device Model', // TODO: Get from device model
          serviceType: 'Service Type', // TODO: Get from service type
          subtotal: request.totalAmount || 0,
          tax: 0,
          discount: 0,
          total: request.totalAmount || 0,
          paymentMethod: request.paymentMethod || 'غير محدد',
          paymentStatus: request.paymentStatus,
          paymentDate: request.paymentStatus === 'paid' ? new Date() : undefined,
        };

        const invoiceBuffer = await invoiceGenerator.generateInvoicePDF(invoiceData);
        
        // In production, save to S3 and return URL
        // For now, return base64
        return {
          invoiceNumber,
          invoiceData: invoiceBuffer.toString('base64'),
        };
      }),

    sendEmail: protectedProcedure
      .input(z.object({ requestId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const request = await db.getRequestById(input.requestId);
        if (!request || request.userId !== ctx.user.id) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }

        const invoiceNumber = invoiceGenerator.generateInvoiceNumber(request.id);
        
        // Generate invoice (simplified for demo)
        const invoiceBuffer = Buffer.from('Invoice content');
        
        const sent = await invoiceGenerator.sendInvoiceEmail(
          ctx.user.email || '',
          invoiceBuffer,
          invoiceNumber
        );

        return { success: sent };
      }),
  }),

  // Moyasar Payment
  moyasar: router({
    getPublishableKey: publicProcedure
      .query(() => {
        return { publishableKey: moyasar.getPublishableKey() };
      }),

    createPayment: protectedProcedure
      .input(z.object({
        requestId: z.number(),
        cardName: z.string(),
        cardNumber: z.string(),
        cvc: z.string(),
        month: z.string(),
        year: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const request = await db.getRequestById(input.requestId);
        if (!request || request.userId !== ctx.user.id) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
        }

        const paymentRequest = {
          amount: (request.totalAmount || 0) * 100, // Convert SAR to halalas
          currency: 'SAR',
          description: `Payment for request #${request.id}`,
          callbackUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-callback`,
          source: {
            type: 'creditcard' as const,
            name: input.cardName,
            number: input.cardNumber.replace(/\s/g, ''),
            cvc: input.cvc,
            month: input.month,
            year: input.year,
          },
          metadata: {
            requestId: request.id,
            userId: ctx.user.id,
          },
        };

        try {
          const payment = await moyasar.createPayment(paymentRequest);
          
          // Update request payment status
          if (payment.status === 'paid') {
            // TODO: Update request payment status in database
            console.log(`[Payment] Request #${request.id} paid successfully`);
          }

          return {
            success: payment.status === 'paid',
            paymentId: payment.id,
            status: payment.status,
          };
        } catch (error) {
          console.error('[Payment] Failed:', error);
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Payment failed' });
        }
      }),

    getPaymentStatus: protectedProcedure
      .input(z.object({ paymentId: z.string() }))
      .query(async ({ input }) => {
        try {
          const payment = await moyasar.getPaymentStatus(input.paymentId);
          return {
            status: payment.status,
            amount: payment.amount / 100, // Convert halalas to SAR
          };
        } catch (error) {
          console.error('[Payment] Failed to get status:', error);
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to get payment status' });
        }
      }),
  }),

  // Analytics
  analytics: router({
    getTotalRevenue: protectedProcedure
      .query(async () => {
        return await db.getTotalRevenue();
      }),

    getRequestsByStatus: protectedProcedure
      .query(async () => {
        return await db.getRequestCountByStatus();
      }),

    getTopServices: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getTopServices(input.limit);
      }),

    getTechnicianStats: protectedProcedure
      .query(async () => {
        return await db.getTechnicianStats();
      }),
  }),
});

export type AppRouter = typeof appRouter;
