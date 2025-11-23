CREATE TABLE `device_models` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceTypeId` int NOT NULL,
	`modelNameEn` varchar(100) NOT NULL,
	`modelNameAr` varchar(100) NOT NULL,
	`releaseYear` int,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `device_models_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `device_types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(100) NOT NULL,
	`nameAr` varchar(100) NOT NULL,
	`brand` varchar(50) NOT NULL,
	`category` enum('phone','tablet','laptop') NOT NULL,
	`imageUrl` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `device_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_pricing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceModelId` int NOT NULL,
	`serviceTypeId` int NOT NULL,
	`priceInSAR` int NOT NULL,
	`warrantyDays` int DEFAULT 90,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_pricing_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceModelId` int NOT NULL,
	`serviceTypeId` int NOT NULL,
	`pricingId` int,
	`serviceMode` enum('express','pickup') NOT NULL,
	`issueDescription` text,
	`address` text NOT NULL,
	`city` varchar(100) NOT NULL,
	`country` varchar(100) NOT NULL DEFAULT 'Saudi Arabia',
	`phoneNumber` varchar(20) NOT NULL,
	`preferredDate` timestamp,
	`preferredTimeSlot` varchar(50),
	`status` enum('pending','confirmed','technician_assigned','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
	`technicianId` int,
	`assignedAt` timestamp,
	`completedAt` timestamp,
	`rating` int,
	`reviewText` text,
	`totalAmount` int,
	`paymentStatus` enum('pending','paid','refunded') DEFAULT 'pending',
	`paymentMethod` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(100) NOT NULL,
	`nameAr` varchar(100) NOT NULL,
	`descriptionEn` text,
	`descriptionAr` text,
	`iconName` varchar(50),
	`estimatedDuration` int,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `technician_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`specializations` text,
	`certifications` text,
	`experienceYears` int,
	`rating` int DEFAULT 0,
	`totalReviews` int DEFAULT 0,
	`isAvailable` boolean DEFAULT true,
	`currentLocation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `technician_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `technician_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','technician') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `device_models` ADD CONSTRAINT `device_models_deviceTypeId_device_types_id_fk` FOREIGN KEY (`deviceTypeId`) REFERENCES `device_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_pricing` ADD CONSTRAINT `service_pricing_deviceModelId_device_models_id_fk` FOREIGN KEY (`deviceModelId`) REFERENCES `device_models`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_pricing` ADD CONSTRAINT `service_pricing_serviceTypeId_service_types_id_fk` FOREIGN KEY (`serviceTypeId`) REFERENCES `service_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_requests` ADD CONSTRAINT `service_requests_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_requests` ADD CONSTRAINT `service_requests_deviceModelId_device_models_id_fk` FOREIGN KEY (`deviceModelId`) REFERENCES `device_models`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_requests` ADD CONSTRAINT `service_requests_serviceTypeId_service_types_id_fk` FOREIGN KEY (`serviceTypeId`) REFERENCES `service_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_requests` ADD CONSTRAINT `service_requests_pricingId_service_pricing_id_fk` FOREIGN KEY (`pricingId`) REFERENCES `service_pricing`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_requests` ADD CONSTRAINT `service_requests_technicianId_users_id_fk` FOREIGN KEY (`technicianId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `technician_profiles` ADD CONSTRAINT `technician_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;