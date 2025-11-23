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

describe("devices router", () => {
  beforeAll(async () => {
    // Seed database before running tests
    try {
      await seedDatabase();
    } catch (error) {
      // Database might already be seeded, ignore error
      console.log("Database seeding skipped (might already be seeded)");
    }
  });

  describe("getTypes", () => {
    it("should return all active device types", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const deviceTypes = await caller.devices.getTypes();

      expect(deviceTypes).toBeDefined();
      expect(Array.isArray(deviceTypes)).toBe(true);
      expect(deviceTypes.length).toBeGreaterThan(0);
      
      // Check structure of first device type
      const firstDevice = deviceTypes[0];
      expect(firstDevice).toHaveProperty("id");
      expect(firstDevice).toHaveProperty("nameEn");
      expect(firstDevice).toHaveProperty("nameAr");
      expect(firstDevice).toHaveProperty("brand");
      expect(firstDevice).toHaveProperty("category");
      expect(firstDevice.isActive).toBe(true);
    });

    it("should include iPhone in device types", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const deviceTypes = await caller.devices.getTypes();
      const iphone = deviceTypes.find(d => d.brand === "Apple" && d.category === "phone");

      expect(iphone).toBeDefined();
      expect(iphone?.nameEn).toBe("iPhone");
    });
  });

  describe("getModels", () => {
    it("should return models for a specific device type", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // First get device types to get an ID
      const deviceTypes = await caller.devices.getTypes();
      const iphone = deviceTypes.find(d => d.brand === "Apple" && d.category === "phone");
      
      if (!iphone) {
        throw new Error("iPhone device type not found");
      }

      const models = await caller.devices.getModels({ deviceTypeId: iphone.id });

      expect(models).toBeDefined();
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBeGreaterThan(0);
      
      // Check structure
      const firstModel = models[0];
      expect(firstModel).toHaveProperty("id");
      expect(firstModel).toHaveProperty("deviceTypeId");
      expect(firstModel).toHaveProperty("modelNameEn");
      expect(firstModel).toHaveProperty("modelNameAr");
      expect(firstModel.deviceTypeId).toBe(iphone.id);
    });

    it("should include iPhone 15 Pro Max in models", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const deviceTypes = await caller.devices.getTypes();
      const iphone = deviceTypes.find(d => d.brand === "Apple" && d.category === "phone");
      
      if (!iphone) {
        throw new Error("iPhone device type not found");
      }

      const models = await caller.devices.getModels({ deviceTypeId: iphone.id });
      const iphone15ProMax = models.find(m => m.modelNameEn.includes("15 Pro Max"));

      expect(iphone15ProMax).toBeDefined();
    });
  });
});
