import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, technicians, serviceRequests, Technician, InsertTechnician } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Technician functions
export async function createTechnician(data: InsertTechnician) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(technicians).values(data);
  return result;
}

export async function getTechnicianByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(technicians).where(eq(technicians.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllActiveTechnicians() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(technicians).where(eq(technicians.isActive, 1));
  return result;
}

export async function updateTechnicianStats(technicianId: number, completedJobs: number, rating: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(technicians)
    .set({ completedJobs, rating })
    .where(eq(technicians.id, technicianId));
}

// Service Request functions
export async function getRequestsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(serviceRequests)
    .where(eq(serviceRequests.userId, userId))
    .orderBy(desc(serviceRequests.createdAt));

  return result;
}

export async function getRequestsByTechnicianId(technicianId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(serviceRequests)
    .where(eq(serviceRequests.technicianId, technicianId))
    .orderBy(desc(serviceRequests.createdAt));

  return result;
}

export async function getAllRequests() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(serviceRequests)
    .orderBy(desc(serviceRequests.createdAt));

  return result;
}

export async function getRequestById(requestId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(serviceRequests)
    .where(eq(serviceRequests.id, requestId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateRequestStatus(
  requestId: number,
  status: "pending" | "confirmed" | "technician_assigned" | "in_progress" | "completed" | "cancelled"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(serviceRequests)
    .set({ status, updatedAt: new Date() })
    .where(eq(serviceRequests.id, requestId));
}

export async function assignTechnicianToRequest(requestId: number, technicianId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(serviceRequests)
    .set({
      technicianId,
      assignedAt: new Date(),
      status: "technician_assigned",
      updatedAt: new Date(),
    })
    .where(eq(serviceRequests.id, requestId));
}

export async function completeRequest(requestId: number, rating?: number, reviewText?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = {
    status: "completed" as const,
    completedAt: new Date(),
    updatedAt: new Date(),
  };

  if (rating !== undefined) {
    updateData.rating = rating;
  }

  if (reviewText !== undefined) {
    updateData.reviewText = reviewText;
  }

  await db.update(serviceRequests)
    .set(updateData)
    .where(eq(serviceRequests.id, requestId));
}

// Service pricing and device functions
import { deviceTypes, deviceModels, serviceTypes, servicePricing } from "../drizzle/schema";

export async function getAllDeviceTypes() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(deviceTypes)
    .where(eq(deviceTypes.isActive, true));

  return result;
}

export async function getDeviceModelsByType(deviceTypeId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(deviceModels)
    .where(eq(deviceModels.deviceTypeId, deviceTypeId));

  return result;
}

export async function getAllServiceTypes() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(serviceTypes)
    .where(eq(serviceTypes.isActive, true));

  return result;
}

export async function getServicePrice(deviceModelId: number, serviceTypeId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(servicePricing)
    .where(
      and(
        eq(servicePricing.deviceModelId, deviceModelId),
        eq(servicePricing.serviceTypeId, serviceTypeId)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createServiceRequest(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(serviceRequests).values(data);
  return result;
}

export async function getUserServiceRequests(userId: number) {
  return await getRequestsByUserId(userId);
}
