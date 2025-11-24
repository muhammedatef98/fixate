import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "technician"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Technicians table - stores information about repair technicians
 */
export const technicians = mysqlTable("technicians", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  specialization: text("specialization"), // e.g., "iPhone, Samsung"
  city: varchar("city", { length: 100 }).notNull(),
  isActive: int("isActive").default(1).notNull(),
  rating: int("rating").default(0), // Average rating * 100 (e.g., 450 = 4.5 stars)
  completedJobs: int("completedJobs").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Technician = typeof technicians.$inferSelect;
export type InsertTechnician = typeof technicians.$inferInsert;

/**
 * Device types (iPhone, Samsung, MacBook, etc.)
 */
export const deviceTypes = mysqlTable("device_types", {
  id: int("id").autoincrement().primaryKey(),
  nameEn: varchar("nameEn", { length: 100 }).notNull(),
  nameAr: varchar("nameAr", { length: 100 }).notNull(),
  brand: varchar("brand", { length: 50 }).notNull(), // Apple, Samsung, Huawei, etc.
  category: mysqlEnum("category", ["phone", "tablet", "laptop"]).notNull(),
  imageUrl: text("imageUrl"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DeviceType = typeof deviceTypes.$inferSelect;
export type InsertDeviceType = typeof deviceTypes.$inferInsert;

/**
 * Device models (iPhone 15 Pro, Samsung S24, etc.)
 */
export const deviceModels = mysqlTable("device_models", {
  id: int("id").autoincrement().primaryKey(),
  deviceTypeId: int("deviceTypeId").notNull().references(() => deviceTypes.id),
  modelNameEn: varchar("modelNameEn", { length: 100 }).notNull(),
  modelNameAr: varchar("modelNameAr", { length: 100 }).notNull(),
  releaseYear: int("releaseYear"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DeviceModel = typeof deviceModels.$inferSelect;
export type InsertDeviceModel = typeof deviceModels.$inferInsert;

/**
 * Service types (screen replacement, battery replacement, etc.)
 */
export const serviceTypes = mysqlTable("service_types", {
  id: int("id").autoincrement().primaryKey(),
  nameEn: varchar("nameEn", { length: 100 }).notNull(),
  nameAr: varchar("nameAr", { length: 100 }).notNull(),
  descriptionEn: text("descriptionEn"),
  descriptionAr: text("descriptionAr"),
  iconName: varchar("iconName", { length: 50 }), // lucide icon name
  estimatedDuration: int("estimatedDuration"), // in minutes
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceType = typeof serviceTypes.$inferSelect;
export type InsertServiceType = typeof serviceTypes.$inferInsert;

/**
 * Pricing for services per device model
 */
export const servicePricing = mysqlTable("service_pricing", {
  id: int("id").autoincrement().primaryKey(),
  deviceModelId: int("deviceModelId").notNull().references(() => deviceModels.id),
  serviceTypeId: int("serviceTypeId").notNull().references(() => serviceTypes.id),
  priceInSAR: int("priceInSAR").notNull(), // Price in Saudi Riyals (stored as integer, e.g., 29900 = 299.00 SAR)
  warrantyDays: int("warrantyDays").default(90), // Warranty period in days
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServicePricing = typeof servicePricing.$inferSelect;
export type InsertServicePricing = typeof servicePricing.$inferInsert;

/**
 * Service requests from customers
 */
export const serviceRequests = mysqlTable("service_requests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  deviceModelId: int("deviceModelId").notNull().references(() => deviceModels.id),
  serviceTypeId: int("serviceTypeId").notNull().references(() => serviceTypes.id),
  pricingId: int("pricingId").references(() => servicePricing.id),
  
  // Service details
  serviceMode: mysqlEnum("serviceMode", ["express", "pickup"]).notNull(), // express: on-site, pickup: collect and deliver
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
  status: mysqlEnum("status", [
    "pending",
    "confirmed",
    "technician_assigned",
    "in_progress",
    "completed",
    "cancelled",
  ])
    .default("pending")
    .notNull(),
  
  // Technician assignment
  technicianId: int("technicianId").references(() => technicians.id),
  assignedAt: timestamp("assignedAt"),
  
  // Completion
  completedAt: timestamp("completedAt"),
  rating: int("rating"), // 1-5 stars
  reviewText: text("reviewText"),
  
  // Payment
  totalAmount: int("totalAmount"), // in SAR cents
  paymentMethod: mysqlEnum("paymentMethod", ["cash_on_delivery", "bank_transfer"])
    .default("cash_on_delivery")
    .notNull(),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "failed"])
    .default("pending")
    .notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;

/**
 * Reviews table for customer feedback on technicians
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  serviceRequestId: int("serviceRequestId")
    .notNull()
    .references(() => serviceRequests.id),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  technicianId: int("technicianId")
    .notNull()
    .references(() => technicians.id),
  rating: int("rating").notNull(), // 1-5 stars (stored as 100-500 for consistency)
  reviewText: text("reviewText"),
  response: text("response"), // Technician's response to review
  respondedAt: timestamp("respondedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Payment receipts table for bank transfer payments
 */
export const paymentReceipts = mysqlTable("payment_receipts", {
  id: int("id").autoincrement().primaryKey(),
  serviceRequestId: int("serviceRequestId")
    .notNull()
    .references(() => serviceRequests.id),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  receiptImageUrl: text("receiptImageUrl").notNull(),
  receiptImageKey: text("receiptImageKey").notNull(), // S3 key
  amount: int("amount").notNull(), // Amount in cents
  transferDate: timestamp("transferDate"),
  bankName: varchar("bankName", { length: 100 }),
  accountNumber: varchar("accountNumber", { length: 50 }),
  status: mysqlEnum("status", ["pending", "approved", "rejected"])
    .default("pending")
    .notNull(),
  reviewedBy: int("reviewedBy").references(() => users.id),
  reviewedAt: timestamp("reviewedAt"),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PaymentReceipt = typeof paymentReceipts.$inferSelect;
export type InsertPaymentReceipt = typeof paymentReceipts.$inferInsert;

/**
 * Technician profiles
 */
export const technicianProfiles = mysqlTable("technician_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id).unique(),
  specializations: text("specializations"), // JSON array of device brands/types
  certifications: text("certifications"),
  experienceYears: int("experienceYears"),
  rating: int("rating").default(0), // Average rating * 100 (e.g., 450 = 4.50)
  totalReviews: int("totalReviews").default(0),
  isAvailable: boolean("isAvailable").default(true),
  currentLocation: text("currentLocation"), // JSON with lat/lng
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TechnicianProfile = typeof technicianProfiles.$inferSelect;
export type InsertTechnicianProfile = typeof technicianProfiles.$inferInsert;

/**
 * Coupons table for discount codes and promotions
 */
export const coupons = mysqlTable("coupons", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  discountType: mysqlEnum("discountType", ["percentage", "fixed"]).notNull(),
  discountValue: int("discountValue").notNull(), // Percentage (0-100) or fixed amount in cents
  minOrderAmount: int("minOrderAmount"), // Minimum order amount in cents
  maxDiscountAmount: int("maxDiscountAmount"), // Maximum discount in cents (for percentage)
  usageLimit: int("usageLimit"), // Total usage limit (null = unlimited)
  usageCount: int("usageCount").default(0).notNull(),
  userUsageLimit: int("userUsageLimit").default(1), // Per user usage limit
  validFrom: timestamp("validFrom").notNull(),
  validUntil: timestamp("validUntil").notNull(),
  isActive: int("isActive").default(1).notNull(),
  description: text("description"),
  createdBy: int("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = typeof coupons.$inferInsert;

/**
 * Coupon usage tracking
 */
export const couponUsage = mysqlTable("coupon_usage", {
  id: int("id").autoincrement().primaryKey(),
  couponId: int("couponId").notNull().references(() => coupons.id),
  userId: int("userId").notNull().references(() => users.id),
  serviceRequestId: int("serviceRequestId").notNull().references(() => serviceRequests.id),
  discountAmount: int("discountAmount").notNull(), // Actual discount applied in cents
  usedAt: timestamp("usedAt").defaultNow().notNull(),
});

export type CouponUsage = typeof couponUsage.$inferSelect;
export type InsertCouponUsage = typeof couponUsage.$inferInsert;

/**
 * Technician location tracking for real-time updates
 */
export const technicianLocations = mysqlTable("technician_locations", {
  id: int("id").autoincrement().primaryKey(),
  technicianId: int("technicianId").notNull().references(() => technicians.id),
  serviceRequestId: int("serviceRequestId").references(() => serviceRequests.id),
  latitude: text("latitude").notNull(), // Store as text for precision
  longitude: text("longitude").notNull(),
  accuracy: int("accuracy"), // GPS accuracy in meters
  heading: int("heading"), // Direction in degrees (0-359)
  speed: int("speed"), // Speed in km/h * 100
  isOnRoute: int("isOnRoute").default(0).notNull(), // 1 if heading to customer
  estimatedArrival: timestamp("estimatedArrival"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TechnicianLocation = typeof technicianLocations.$inferSelect;
export type InsertTechnicianLocation = typeof technicianLocations.$inferInsert;

/**
 * Push notification subscriptions
 */
export const pushSubscriptions = mysqlTable("push_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  userAgent: text("userAgent"),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PushSubscription = typeof pushSubscriptions.$inferSelect;
export type InsertPushSubscription = typeof pushSubscriptions.$inferInsert;
