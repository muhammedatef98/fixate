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
    "cancelled"
  ]).default("pending").notNull(),
  
  // Technician assignment
  technicianId: int("technicianId").references(() => users.id),
  assignedAt: timestamp("assignedAt"),
  
  // Completion
  completedAt: timestamp("completedAt"),
  rating: int("rating"), // 1-5 stars
  reviewText: text("reviewText"),
  
  // Payment
  totalAmount: int("totalAmount"), // in SAR cents
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "refunded"]).default("pending"),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;

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
