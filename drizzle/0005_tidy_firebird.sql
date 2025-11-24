CREATE TABLE `coupon_usage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`couponId` int NOT NULL,
	`userId` int NOT NULL,
	`serviceRequestId` int NOT NULL,
	`discountAmount` int NOT NULL,
	`usedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `coupon_usage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`discountType` enum('percentage','fixed') NOT NULL,
	`discountValue` int NOT NULL,
	`minOrderAmount` int,
	`maxDiscountAmount` int,
	`usageLimit` int,
	`usageCount` int NOT NULL DEFAULT 0,
	`userUsageLimit` int DEFAULT 1,
	`validFrom` timestamp NOT NULL,
	`validUntil` timestamp NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`description` text,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coupons_id` PRIMARY KEY(`id`),
	CONSTRAINT `coupons_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `push_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`endpoint` text NOT NULL,
	`p256dh` text NOT NULL,
	`auth` text NOT NULL,
	`userAgent` text,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `push_subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `technician_locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`technicianId` int NOT NULL,
	`serviceRequestId` int,
	`latitude` text NOT NULL,
	`longitude` text NOT NULL,
	`accuracy` int,
	`heading` int,
	`speed` int,
	`isOnRoute` int NOT NULL DEFAULT 0,
	`estimatedArrival` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `technician_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `coupon_usage` ADD CONSTRAINT `coupon_usage_couponId_coupons_id_fk` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `coupon_usage` ADD CONSTRAINT `coupon_usage_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `coupon_usage` ADD CONSTRAINT `coupon_usage_serviceRequestId_service_requests_id_fk` FOREIGN KEY (`serviceRequestId`) REFERENCES `service_requests`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `coupons` ADD CONSTRAINT `coupons_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `push_subscriptions` ADD CONSTRAINT `push_subscriptions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `technician_locations` ADD CONSTRAINT `technician_locations_technicianId_technicians_id_fk` FOREIGN KEY (`technicianId`) REFERENCES `technicians`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `technician_locations` ADD CONSTRAINT `technician_locations_serviceRequestId_service_requests_id_fk` FOREIGN KEY (`serviceRequestId`) REFERENCES `service_requests`(`id`) ON DELETE no action ON UPDATE no action;