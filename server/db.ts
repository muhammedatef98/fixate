import { eq, and, ne, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, technicians, serviceRequests, Technician, InsertTechnician } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
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

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
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

  const result = await db.select().from(technicians).where(eq(technicians.isActive, true));
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

// Reviews functions
import { reviews, paymentReceipts } from "../drizzle/schema";

export async function createReview(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(reviews).values(data);
  return result;
}

export async function getReviewsByTechnicianId(technicianId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(reviews)
    .where(eq(reviews.technicianId, technicianId))
    .orderBy(desc(reviews.createdAt));

  return result;
}

export async function getReviewByRequestId(requestId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(reviews)
    .where(eq(reviews.serviceRequestId, requestId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTechnicianRating(technicianId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Get all reviews for this technician
  const techReviews = await db.select()
    .from(reviews)
    .where(eq(reviews.technicianId, technicianId));

  if (techReviews.length === 0) return;

  // Calculate average rating
  const totalRating = techReviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  const averageRating = Math.round(totalRating / techReviews.length);

  // Update technician rating
  await db.update(technicians)
    .set({ rating: averageRating })
    .where(eq(technicians.id, technicianId));
}

// Payment Receipt functions
export async function createPaymentReceipt(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(paymentReceipts).values(data);
  return result;
}

export async function getPaymentReceiptByRequestId(requestId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(paymentReceipts)
    .where(eq(paymentReceipts.serviceRequestId, requestId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getAllPendingPaymentReceipts() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(paymentReceipts)
    .where(eq(paymentReceipts.status, "pending"))
    .orderBy(desc(paymentReceipts.createdAt));

  return result;
}

export async function updatePaymentReceiptStatus(
  receiptId: number,
  status: "approved" | "rejected",
  reviewedBy: number,
  rejectionReason?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = {
    status,
    reviewedBy,
    reviewedAt: new Date(),
  };

  if (rejectionReason) {
    updateData.rejectionReason = rejectionReason;
  }

  await db.update(paymentReceipts)
    .set(updateData)
    .where(eq(paymentReceipts.id, receiptId));

  // If approved, update service request payment status
  if (status === "approved") {
    const receipt = await db.select()
      .from(paymentReceipts)
      .where(eq(paymentReceipts.id, receiptId))
      .limit(1);

    if (receipt.length > 0) {
      await db.update(serviceRequests)
        .set({ paymentStatus: "paid" })
        .where(eq(serviceRequests.id, receipt[0].serviceRequestId));
    }
  }
}

// Coupons functions
import { coupons, couponUsage, technicianLocations, pushSubscriptions } from "../drizzle/schema";

export async function getCouponByCode(code: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(coupons)
    .where(eq(coupons.code, code))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function validateCoupon(code: string, userId: number, orderAmount: number) {
  const coupon = await getCouponByCode(code);
  if (!coupon) return { valid: false, message: "كود الخصم غير موجود" };

  if (coupon.isActive !== 1) return { valid: false, message: "كود الخصم غير نشط" };

  const now = new Date();
  if (coupon.validFrom > now) return { valid: false, message: "كود الخصم لم يبدأ بعد" };
  if (coupon.validUntil < now) return { valid: false, message: "كود الخصم منتهي الصلاحية" };

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, message: "تم استخدام كود الخصم بالكامل" };
  }

  if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
    return { valid: false, message: `الحد الأدنى للطلب ${coupon.minOrderAmount / 100} ريال` };
  }

  // Check user usage
  const db = await getDb();
  if (db && coupon.userUsageLimit) {
    const userUsage = await db.select()
      .from(couponUsage)
      .where(and(
        eq(couponUsage.couponId, coupon.id),
        eq(couponUsage.userId, userId)
      ));

    if (userUsage.length >= coupon.userUsageLimit) {
      return { valid: false, message: "لقد استخدمت هذا الكود من قبل" };
    }
  }

  // Calculate discount
  let discountAmount = 0;
  if (coupon.discountType === "percentage") {
    discountAmount = Math.floor((orderAmount * coupon.discountValue) / 100);
    if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
      discountAmount = coupon.maxDiscountAmount;
    }
  } else {
    discountAmount = coupon.discountValue;
  }

  return { valid: true, coupon, discountAmount };
}

export async function applyCoupon(couponId: number, userId: number, serviceRequestId: number, discountAmount: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Record usage
  await db.insert(couponUsage).values({
    couponId,
    userId,
    serviceRequestId,
    discountAmount,
  });

  // Increment usage count
  await db.update(coupons)
    .set({ usageCount: sql`${coupons.usageCount} + 1` })
    .where(eq(coupons.id, couponId));
}

export async function getAllCoupons() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(coupons).orderBy(desc(coupons.createdAt));
}

export async function createCoupon(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(coupons).values(data);
  return result;
}

// Technician Location functions
export async function updateTechnicianLocation(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(technicianLocations).values(data);
}

export async function getLatestTechnicianLocation(technicianId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(technicianLocations)
    .where(eq(technicianLocations.technicianId, technicianId))
    .orderBy(desc(technicianLocations.createdAt))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getTechnicianLocationForRequest(requestId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(technicianLocations)
    .where(eq(technicianLocations.serviceRequestId, requestId))
    .orderBy(desc(technicianLocations.createdAt))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

// Push Subscription functions
export async function savePushSubscription(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if subscription already exists
  const existing = await db.select()
    .from(pushSubscriptions)
    .where(and(
      eq(pushSubscriptions.userId, data.userId),
      eq(pushSubscriptions.endpoint, data.endpoint)
    ))
    .limit(1);

  if (existing.length > 0) {
    // Update existing
    await db.update(pushSubscriptions)
      .set({ isActive: 1, updatedAt: new Date() })
      .where(eq(pushSubscriptions.id, existing[0].id));
    return existing[0];
  }

  // Insert new
  const result = await db.insert(pushSubscriptions).values(data);
  return result;
}

export async function getUserPushSubscriptions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select()
    .from(pushSubscriptions)
    .where(and(
      eq(pushSubscriptions.userId, userId),
      eq(pushSubscriptions.isActive, true)
    ));
}

export async function deletePushSubscription(endpoint: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(pushSubscriptions)
    .set({ isActive: 0 })
    .where(eq(pushSubscriptions.endpoint, endpoint));
}

// ============================================
// Chat Functions
// ============================================

import { chatRooms, messages, InsertChatRoom, InsertMessage, loyaltyPoints, pointsTransactions, InsertLoyaltyPoints, InsertPointsTransaction, rewards } from "../drizzle/schema";

export async function createChatRoom(data: InsertChatRoom) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(chatRooms).values(data);
  return result[0].insertId;
}

export async function getChatRoomByRequestId(requestId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(chatRooms).where(eq(chatRooms.serviceRequestId, requestId)).limit(1);
  return result[0] || null;
}

export async function getChatRoomsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(chatRooms).where(eq(chatRooms.customerId, userId));
}

export async function sendMessage(data: InsertMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(messages).values(data);
  
  // Update last message timestamp
  await db.update(chatRooms)
    .set({ lastMessageAt: new Date() })
    .where(eq(chatRooms.id, data.chatRoomId));
  
  return result[0].insertId;
}

export async function getMessagesByRoomId(roomId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(messages)
    .where(eq(messages.chatRoomId, roomId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);
}

export async function markMessagesAsRead(roomId: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(messages)
    .set({ isRead: 1 })
    .where(
      and(
        eq(messages.chatRoomId, roomId),
        ne(messages.senderId, userId),
        eq(messages.isRead, 0)
      )
    );
}

// ============================================
// Loyalty Points Functions
// ============================================

export async function getUserLoyaltyPoints(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(loyaltyPoints).where(eq(loyaltyPoints.userId, userId)).limit(1);
  return result[0] || null;
}

export async function initializeLoyaltyPoints(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const data: InsertLoyaltyPoints = {
    userId,
    totalPoints: 0,
    availablePoints: 0,
    lifetimePoints: 0,
    membershipTier: "bronze",
  };
  
  await db.insert(loyaltyPoints).values(data);
}

export async function addPoints(userId: number, points: number, requestId?: number, description?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Get or create loyalty points
  let userPoints = await getUserLoyaltyPoints(userId);
  if (!userPoints) {
    await initializeLoyaltyPoints(userId);
    userPoints = await getUserLoyaltyPoints(userId);
  }
  
  if (!userPoints) throw new Error("Failed to initialize loyalty points");
  
  const newTotal = userPoints.totalPoints + points;
  const newAvailable = userPoints.availablePoints + points;
  const newLifetime = userPoints.lifetimePoints + points;
  
  // Determine tier based on lifetime points
  let tier: "bronze" | "silver" | "gold" | "platinum" = "bronze";
  if (newLifetime >= 10000) tier = "platinum";
  else if (newLifetime >= 5000) tier = "gold";
  else if (newLifetime >= 2000) tier = "silver";
  
  // Update points
  await db.update(loyaltyPoints)
    .set({
      totalPoints: newTotal,
      availablePoints: newAvailable,
      lifetimePoints: newLifetime,
      membershipTier: tier,
    })
    .where(eq(loyaltyPoints.userId, userId));
  
  // Record transaction
  const transactionData: InsertPointsTransaction = {
    userId,
    serviceRequestId: requestId,
    points,
    transactionType: "earn",
    description: description || `Earned ${points} points`,
  };
  
  await db.insert(pointsTransactions).values(transactionData);
}

export async function redeemPoints(userId: number, points: number, description: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const userPoints = await getUserLoyaltyPoints(userId);
  if (!userPoints) throw new Error("User loyalty points not found");
  
  if (userPoints.availablePoints < points) {
    throw new Error("Insufficient points");
  }
  
  const newTotal = userPoints.totalPoints - points;
  const newAvailable = userPoints.availablePoints - points;
  
  await db.update(loyaltyPoints)
    .set({
      totalPoints: newTotal,
      availablePoints: newAvailable,
    })
    .where(eq(loyaltyPoints.userId, userId));
  
  // Record transaction
  const transactionData: InsertPointsTransaction = {
    userId,
    points: -points,
    transactionType: "redeem",
    description,
  };
  
  await db.insert(pointsTransactions).values(transactionData);
}

export async function getPointsTransactions(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(pointsTransactions)
    .where(eq(pointsTransactions.userId, userId))
    .orderBy(desc(pointsTransactions.createdAt))
    .limit(limit);
}

export async function getAllRewards() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(rewards).where(eq(rewards.isActive, true));
}

// ============================================
// Analytics Functions
// ============================================

export async function getTotalRevenue() {
  const db = await getDb();
  if (!db) return 0;
  
  const result = await db.select({
    count: sql<number>`COUNT(*)`
  })
  .from(serviceRequests)
  .where(eq(serviceRequests.status, "completed"));
  
  return result[0]?.count || 0;
}

export async function getRequestCountByStatus() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select({
    status: serviceRequests.status,
    count: sql<number>`COUNT(*)`
  })
  .from(serviceRequests)
  .groupBy(serviceRequests.status);
}

export async function getTopServices(limit: number = 5) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select({
    serviceTypeId: serviceRequests.serviceTypeId,
    count: sql<number>`COUNT(*)`
  })
  .from(serviceRequests)
  .groupBy(serviceRequests.serviceTypeId)
  .orderBy(desc(sql<number>`COUNT(*)`))
  .limit(limit);
}

export async function getTechnicianStats() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select({
    technicianId: serviceRequests.technicianId,
    completedCount: sql<number>`COUNT(*)`
  })
  .from(serviceRequests)
  .where(eq(serviceRequests.status, "completed"))
  .groupBy(serviceRequests.technicianId);
}


// ==================== Simple Auth ====================

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.execute(sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `);

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as any;
  } catch (error) {
    console.error('[Database] Error getting user by email:', error);
    return null;
  }
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.execute(sql`
      SELECT * FROM users WHERE id = ${userId} LIMIT 1
    `);

    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as any;
  } catch (error) {
    console.error('[Database] Error getting user by id:', error);
    return null;
  }
}

export async function createUser(userData: { name: string; email: string; phone: string; password: string }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  try {
    const result = await db.execute(sql`
      INSERT INTO users (name, email, phone, password, role, created_at)
      VALUES (${userData.name}, ${userData.email}, ${userData.phone}, ${userData.password}, 'user', CURRENT_TIMESTAMP)
      RETURNING id
    `);

    if (!result.rows || result.rows.length === 0) {
      throw new Error('Failed to create user');
    }

    return (result.rows[0] as any).id;
  } catch (error) {
    console.error('[Database] Error creating user:', error);
    throw error;
  }
}

// Service Request Management Functions
export async function getUserRequests(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(serviceRequests)
    .where(eq(serviceRequests.userId, userId))
    .orderBy(desc(serviceRequests.createdAt));

  return result;
}

export async function getPendingRequests(city: string) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(serviceRequests)
    .where(and(
      eq(serviceRequests.status, 'pending'),
      eq(serviceRequests.city, city),
      isNull(serviceRequests.technicianId)
    ))
    .orderBy(desc(serviceRequests.createdAt));

  return result;
}

export async function assignRequestToTechnician(requestId: number, technicianId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(serviceRequests)
    .set({
      technicianId,
      assignedAt: new Date(),
      status: 'confirmed',
      updatedAt: new Date(),
    })
    .where(eq(serviceRequests.id, requestId));
}

export async function updateRequestStatus(requestId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = {
    status,
    updatedAt: new Date(),
  };

  if (status === 'completed') {
    updateData.completedAt = new Date();
  }

  await db.update(serviceRequests)
    .set(updateData)
    .where(eq(serviceRequests.id, requestId));
}

export async function getTechnicianRequests(technicianId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(serviceRequests)
    .where(eq(serviceRequests.technicianId, technicianId))
    .orderBy(desc(serviceRequests.createdAt));

  return result;
}
