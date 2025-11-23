import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  deviceTypes, 
  deviceModels, 
  serviceTypes, 
  servicePricing,
  serviceRequests,
  technicianProfiles 
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

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

    const textFields = ["name", "email", "phone", "loginMethod"] as const;
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

// Device and Service queries
export async function getAllDeviceTypes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(deviceTypes).where(eq(deviceTypes.isActive, true));
}

export async function getDeviceModelsByType(deviceTypeId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(deviceModels)
    .where(and(
      eq(deviceModels.deviceTypeId, deviceTypeId),
      eq(deviceModels.isActive, true)
    ));
}

export async function getAllServiceTypes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(serviceTypes).where(eq(serviceTypes.isActive, true));
}

export async function getServicePrice(deviceModelId: number, serviceTypeId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(servicePricing)
    .where(and(
      eq(servicePricing.deviceModelId, deviceModelId),
      eq(servicePricing.serviceTypeId, serviceTypeId),
      eq(servicePricing.isActive, true)
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createServiceRequest(data: typeof serviceRequests.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(serviceRequests).values(data);
  return result;
}

export async function getUserServiceRequests(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(serviceRequests)
    .where(eq(serviceRequests.userId, userId))
    .orderBy(serviceRequests.createdAt);
}
