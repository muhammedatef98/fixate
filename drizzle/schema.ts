import { pgTable, pgEnum, serial, integer, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/pg-core";

// Define enums
export const userTypeEnum = pgEnum("user_type", ["client", "technician"]);
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const categoryEnum = pgEnum("category", ["phone", "laptop", "tablet", "other"]);
export const statusEnum = pgEnum("status", ["pending", "confirmed", "in_progress", "completed", "cancelled"]);
export const paymentMethodEnum = pgEnum("payment_method", ["cash_on_delivery", "bank_transfer", "online"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "failed", "refunded"]);
export const serviceModeEnum = pgEnum("service_mode", ["express", "pickup"]);
export const discountTypeEnum = pgEnum("discount_type", ["percentage", "fixed"]);
export const membershipTierEnum = pgEnum("membership_tier", ["bronze", "silver", "gold", "platinum"]);
export const messageTypeEnum = pgEnum("message_type", ["text", "image", "file"]);
export const minTierEnum = pgEnum("min_tier", ["bronze", "silver", "gold", "platinum"]);
export const transactionTypeEnum = pgEnum("transaction_type", ["earned", "redeemed", "expired"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  userType: userTypeEnum("userType").default("client").notNull(), // client or technician
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Technicians table - stores information about repair technicians
 */
export const technicians = pgTable("technicians", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  specialization: text("specialization"), // e.g., "iPhone, Samsung"
  city: varchar("city", { length: 100 }).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  rating: integer("rating").default(0), // Average rating * 100 (e.g., 450 = 4.5 stars)
  completedJobs: integer("completedJobs").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Technician = typeof technicians.$inferSelect;
export type InsertTechnician = typeof technicians.$inferInsert;

/**
 * Device types (iPhone, Samsung, MacBook, etc.)
 */
export const deviceTypes = pgTable("device_types", {
  id: serial("id").primaryKey(),
  nameEn: varchar("nameEn", { length: 100 }).notNull(),
  nameAr: varchar("nameAr", { length: 100 }).notNull(),
  brand: varchar("brand", { length: 50 }).notNull(), // Apple, Samsung, Huawei, etc.
  category: categoryEnum("category").notNull(),
  imageUrl: text("imageUrl"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type DeviceType = typeof deviceTypes.$inferSelect;
export type InsertDeviceType = typeof deviceTypes.$inferInsert;

/**
 * Device models (iPhone 15 Pro, Samsung S24, etc.)
 */
export const deviceModels = pgTable("device_models", {
  id: serial("id").primaryKey(),
  deviceTypeId: integer("deviceTypeId").notNull().references(() => deviceTypes.id),
  modelNameEn: varchar("modelNameEn", { length: 100 }).notNull(),
  modelNameAr: varchar("modelNameAr", { length: 100 }).notNull(),
  releaseYear: integer("releaseYear"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type DeviceModel = typeof deviceModels.$inferSelect;
export type InsertDeviceModel = typeof deviceModels.$inferInsert;

/**
 * Service types (screen replacement, battery replacement, etc.)
 */
export const serviceTypes = pgTable("service_types", {
  id: serial("id").primaryKey(),
  nameEn: varchar("nameEn", { length: 100 }).notNull(),
  nameAr: varchar("nameAr", { length: 100 }).notNull(),
  descriptionEn: text("descriptionEn"),
  descriptionAr: text("descriptionAr"),
  iconName: varchar("iconName", { length: 50 }), // lucide icon name
  estimatedDuration: integer("estimatedDuration"), // in minutes
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ServiceType = typeof serviceTypes.$inferSelect;
export type InsertServiceType = typeof serviceTypes.$inferInsert;

/**
 * Pricing for services per device model
 */
export const servicePricing = pgTable("service_pricing", {
  id: serial("id").primaryKey(),
  deviceModelId: integer("deviceModelId").notNull().references(() => deviceModels.id),
  serviceTypeId: integer("serviceTypeId").notNull().references(() => serviceTypes.id),
  priceInSAR: integer("priceInSAR").notNull(), // Price in Saudi Riyals (stored as integer, e.g., 29900 = 299.00 SAR)
  warrantyDays: integer("warrantyDays").default(90), // Warranty period in days
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ServicePricing = typeof servicePricing.$inferSelect;
export type InsertServicePricing = typeof servicePricing.$inferInsert;

/**
 * Service requests from customers
 */
export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  deviceModelId: integer("deviceModelId").notNull().references(() => deviceModels.id),
  serviceTypeId: integer("serviceTypeId").notNull().references(() => serviceTypes.id),
  pricingId: integer("pricingId").references(() => servicePricing.id),
  
  // Service details
  serviceMode: serviceModeEnum("serviceMode").notNull(), // express: on-site, pickup: collect and deliver
  issueDescription: text("issueDescription"),
  
  // Location and contact
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).default("Saudi Arabia").notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  
  // Scheduling
  preferredDate: timestamp("preferredDate"),
  preferredTimeSlot: varchar("preferredTimeSlot", { length: 50 }), // morning, afternoon, evening
  
  // Status tracking
  status: statusEnum("status")
    .default("pending")
    .notNull(),
  
  // Technician assignment
  technicianId: integer("technicianId").references(() => technicians.id),
  assignedAt: timestamp("assignedAt"),
  
  // Completion
  completedAt: timestamp("completedAt"),
  rating: integer("rating"), // 1-5 stars
  reviewText: text("reviewText"),
  
  // Payment
  totalAmount: integer("totalAmount"), // in SAR cents
  paymentMethod: paymentMethodEnum("paymentMethod")
    .default("cash_on_delivery")
    .notNull(),
  paymentStatus: paymentStatusEnum("paymentStatus")
    .default("pending")
    .notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;

/**
 * Reviews table for customer feedback on technicians
 */
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  serviceRequestId: integer("serviceRequestId")
    .notNull()
    .references(() => serviceRequests.id),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  technicianId: integer("technicianId")
    .notNull()
    .references(() => technicians.id),
  rating: integer("rating").notNull(), // 1-5 stars (stored as 100-500 for consistency)
  reviewText: text("reviewText"),
  response: text("response"), // Technician's response to review
  respondedAt: timestamp("respondedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Payment receipts table for bank transfer payments
 */
export const paymentReceipts = pgTable("payment_receipts", {
  id: serial("id").primaryKey(),
  serviceRequestId: integer("serviceRequestId")
    .notNull()
    .references(() => serviceRequests.id),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  receiptImageUrl: text("receiptImageUrl").notNull(),
  receiptImageKey: text("receiptImageKey").notNull(), // S3 key
  amount: integer("amount").notNull(), // Amount in cents
  transferDate: timestamp("transferDate"),
  bankName: varchar("bankName", { length: 100 }),
  accountNumber: varchar("accountNumber", { length: 50 }),
  status: statusEnum("status")
    .default("pending")
    .notNull(),
  reviewedBy: integer("reviewedBy").references(() => users.id),
  reviewedAt: timestamp("reviewedAt"),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PaymentReceipt = typeof paymentReceipts.$inferSelect;
export type InsertPaymentReceipt = typeof paymentReceipts.$inferInsert;

/**
 * Technician profiles
 */
export const technicianProfiles = pgTable("technician_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id).unique(),
  specializations: text("specializations"), // JSON array of device brands/types
  certifications: text("certifications"),
  experienceYears: integer("experienceYears"),
  rating: integer("rating").default(0), // Average rating * 100 (e.g., 450 = 4.50)
  totalReviews: integer("totalReviews").default(0),
  isAvailable: boolean("isAvailable").default(true),
  currentLocation: text("currentLocation"), // JSON with lat/lng
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type TechnicianProfile = typeof technicianProfiles.$inferSelect;
export type InsertTechnicianProfile = typeof technicianProfiles.$inferInsert;

/**
 * Coupons table for discount codes and promotions
 */
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  discountType: discountTypeEnum("discountType").notNull(),
  discountValue: integer("discountValue").notNull(), // Percentage (0-100) or fixed amount in cents
  minOrderAmount: integer("minOrderAmount"), // Minimum order amount in cents
  maxDiscountAmount: integer("maxDiscountAmount"), // Maximum discount in cents (for percentage)
  usageLimit: integer("usageLimit"), // Total usage limit (null = unlimited)
  usageCount: integer("usageCount").default(0).notNull(),
  userUsageLimit: integer("userUsageLimit").default(1), // Per user usage limit
  validFrom: timestamp("validFrom").notNull(),
  validUntil: timestamp("validUntil").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  description: text("description"),
  createdBy: integer("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = typeof coupons.$inferInsert;

/**
 * Coupon usage tracking
 */
export const couponUsage = pgTable("coupon_usage", {
  id: serial("id").primaryKey(),
  couponId: integer("couponId").notNull().references(() => coupons.id),
  userId: integer("userId").notNull().references(() => users.id),
  serviceRequestId: integer("serviceRequestId").notNull().references(() => serviceRequests.id),
  discountAmount: integer("discountAmount").notNull(), // Actual discount applied in cents
  usedAt: timestamp("usedAt").defaultNow().notNull(),
});

export type CouponUsage = typeof couponUsage.$inferSelect;
export type InsertCouponUsage = typeof couponUsage.$inferInsert;

/**
 * Technician location tracking for real-time updates
 */
export const technicianLocations = pgTable("technician_locations", {
  id: serial("id").primaryKey(),
  technicianId: integer("technicianId").notNull().references(() => technicians.id),
  serviceRequestId: integer("serviceRequestId").references(() => serviceRequests.id),
  latitude: text("latitude").notNull(), // Store as text for precision
  longitude: text("longitude").notNull(),
  accuracy: integer("accuracy"), // GPS accuracy in meters
  heading: integer("heading"), // Direction in degrees (0-359)
  speed: integer("speed"), // Speed in km/h * 100
  isOnRoute: integer("isOnRoute").default(0).notNull(), // 1 if heading to customer
  estimatedArrival: timestamp("estimatedArrival"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TechnicianLocation = typeof technicianLocations.$inferSelect;
export type InsertTechnicianLocation = typeof technicianLocations.$inferInsert;

/**
 * Push notification subscriptions
 */
export const pushSubscriptions = pgTable("push_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  userAgent: text("userAgent"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PushSubscription = typeof pushSubscriptions.$inferSelect;
export type InsertPushSubscription = typeof pushSubscriptions.$inferInsert;

/**
 * Chat rooms for customer-technician communication
 */
export const chatRooms = pgTable("chat_rooms", {
  id: serial("id").primaryKey(),
  serviceRequestId: integer("serviceRequestId").notNull().references(() => serviceRequests.id).unique(),
  customerId: integer("customerId").notNull().references(() => users.id),
  technicianId: integer("technicianId").notNull().references(() => technicians.id),
  lastMessageAt: timestamp("lastMessageAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatRoom = typeof chatRooms.$inferSelect;
export type InsertChatRoom = typeof chatRooms.$inferInsert;

/**
 * Messages in chat rooms
 */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatRoomId: integer("chatRoomId").notNull().references(() => chatRooms.id),
  senderId: integer("senderId").notNull().references(() => users.id),
  content: text("content").notNull(),
  messageType: messageTypeEnum("messageType").default("text").notNull(),
  imageUrl: text("imageUrl"),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Loyalty points for customers
 */
export const loyaltyPoints = pgTable("loyalty_points", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id).unique(),
  totalPoints: integer("totalPoints").default(0).notNull(),
  availablePoints: integer("availablePoints").default(0).notNull(),
  lifetimePoints: integer("lifetimePoints").default(0).notNull(), // Total points earned ever
  membershipTier: membershipTierEnum("membershipTier").default("bronze").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LoyaltyPoints = typeof loyaltyPoints.$inferSelect;
export type InsertLoyaltyPoints = typeof loyaltyPoints.$inferInsert;

/**
 * Points transactions history
 */
export const pointsTransactions = pgTable("points_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  serviceRequestId: integer("serviceRequestId").references(() => serviceRequests.id),
  points: integer("points").notNull(), // Positive for earn, negative for redeem
  transactionType: transactionTypeEnum("transactionType").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PointsTransaction = typeof pointsTransactions.$inferSelect;
export type InsertPointsTransaction = typeof pointsTransactions.$inferInsert;

/**
 * Rewards catalog
 */
export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  pointsCost: integer("pointsCost").notNull(),
  discountType: discountTypeEnum("discountType").notNull(),
  discountValue: integer("discountValue").notNull(),
  minTier: minTierEnum("minTier").default("bronze").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Reward = typeof rewards.$inferSelect;
export type InsertReward = typeof rewards.$inferInsert;

// Add new columns for unified mobile/web support (added for integration)
// These are added as optional fields to the serviceRequests table
