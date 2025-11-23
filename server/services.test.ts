import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { seedDatabase } from "./seed";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("services router", () => {
  beforeAll(async () => {
    try {
      await seedDatabase();
    } catch (error) {
      console.log("Database seeding skipped");
    }
  });

  describe("getTypes", () => {
    it("should return all active service types", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const serviceTypes = await caller.services.getTypes();

      expect(serviceTypes).toBeDefined();
      expect(Array.isArray(serviceTypes)).toBe(true);
      expect(serviceTypes.length).toBeGreaterThan(0);
      
      const firstService = serviceTypes[0];
      expect(firstService).toHaveProperty("id");
      expect(firstService).toHaveProperty("nameEn");
      expect(firstService).toHaveProperty("nameAr");
      expect(firstService).toHaveProperty("descriptionEn");
      expect(firstService).toHaveProperty("descriptionAr");
      expect(firstService.isActive).toBe(true);
    });

    it("should include screen replacement service", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const serviceTypes = await caller.services.getTypes();
      const screenReplacement = serviceTypes.find(s => s.nameEn === "Screen Replacement");

      expect(screenReplacement).toBeDefined();
      expect(screenReplacement?.nameAr).toBe("تغيير الشاشة");
    });

    it("should include battery replacement service", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const serviceTypes = await caller.services.getTypes();
      const batteryReplacement = serviceTypes.find(s => s.nameEn === "Battery Replacement");

      expect(batteryReplacement).toBeDefined();
      expect(batteryReplacement?.nameAr).toBe("تغيير البطارية");
    });
  });

  describe("getPrice", () => {
    it("should return pricing for a valid device model and service", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // Get device types and models
      const deviceTypes = await caller.devices.getTypes();
      const iphone = deviceTypes.find(d => d.brand === "Apple" && d.category === "phone");
      expect(iphone).toBeDefined();

      const models = await caller.devices.getModels({ deviceTypeId: iphone!.id });
      const iphone15ProMax = models.find(m => m.modelNameEn.includes("15 Pro Max"));
      expect(iphone15ProMax).toBeDefined();

      // Get service types
      const serviceTypes = await caller.services.getTypes();
      const screenReplacement = serviceTypes.find(s => s.nameEn === "Screen Replacement");
      expect(screenReplacement).toBeDefined();

      // Get pricing
      const pricing = await caller.services.getPrice({
        deviceModelId: iphone15ProMax!.id,
        serviceTypeId: screenReplacement!.id,
      });

      expect(pricing).toBeDefined();
      expect(pricing).toHaveProperty("priceInSAR");
      expect(pricing).toHaveProperty("warrantyDays");
      expect(pricing!.priceInSAR).toBeGreaterThan(0);
      expect(pricing!.warrantyDays).toBeGreaterThan(0);
    });

    it("should return null for non-existent pricing", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const pricing = await caller.services.getPrice({
        deviceModelId: 99999,
        serviceTypeId: 99999,
      });

      expect(pricing).toBeNull();
    });

    it("should have correct price for iPhone 15 Pro Max screen replacement", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const deviceTypes = await caller.devices.getTypes();
      const iphone = deviceTypes.find(d => d.brand === "Apple" && d.category === "phone");
      const models = await caller.devices.getModels({ deviceTypeId: iphone!.id });
      const iphone15ProMax = models.find(m => m.modelNameEn.includes("15 Pro Max"));
      
      const serviceTypes = await caller.services.getTypes();
      const screenReplacement = serviceTypes.find(s => s.nameEn === "Screen Replacement");

      const pricing = await caller.services.getPrice({
        deviceModelId: iphone15ProMax!.id,
        serviceTypeId: screenReplacement!.id,
      });

      expect(pricing).toBeDefined();
      expect(pricing!.priceInSAR).toBe(149900); // 1499 SAR
      expect(pricing!.warrantyDays).toBe(180); // 6 months warranty
    });
  });
});
