import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { seedDatabase } from "./seed";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "./_core/notification";

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

        await db.createServiceRequest({
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
});

export type AppRouter = typeof appRouter;
