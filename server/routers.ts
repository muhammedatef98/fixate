import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { seedDatabase } from "./seed";

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
          throw new Error('Service pricing not found');
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

        return { success: true };
      }),

    getUserRequests: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserServiceRequests(ctx.user.id);
    }),
  }),

  // Admin functions
  admin: router({
    seedDatabase: protectedProcedure.mutation(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      await seedDatabase();
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
