CREATE TABLE `technicians` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`nameAr` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`specialization` text,
	`city` varchar(100) NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`rating` int DEFAULT 0,
	`completedJobs` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `technicians_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `service_requests` DROP FOREIGN KEY `service_requests_technicianId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `technicians` ADD CONSTRAINT `technicians_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_requests` ADD CONSTRAINT `service_requests_technicianId_technicians_id_fk` FOREIGN KEY (`technicianId`) REFERENCES `technicians`(`id`) ON DELETE no action ON UPDATE no action;