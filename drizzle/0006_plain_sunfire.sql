CREATE TABLE `chat_rooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serviceRequestId` int NOT NULL,
	`customerId` int NOT NULL,
	`technicianId` int NOT NULL,
	`lastMessageAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_rooms_id` PRIMARY KEY(`id`),
	CONSTRAINT `chat_rooms_serviceRequestId_unique` UNIQUE(`serviceRequestId`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_points` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalPoints` int NOT NULL DEFAULT 0,
	`availablePoints` int NOT NULL DEFAULT 0,
	`lifetimePoints` int NOT NULL DEFAULT 0,
	`membershipTier` enum('bronze','silver','gold','platinum') NOT NULL DEFAULT 'bronze',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loyalty_points_id` PRIMARY KEY(`id`),
	CONSTRAINT `loyalty_points_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chatRoomId` int NOT NULL,
	`senderId` int NOT NULL,
	`content` text NOT NULL,
	`messageType` enum('text','image') NOT NULL DEFAULT 'text',
	`imageUrl` text,
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `points_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`serviceRequestId` int,
	`points` int NOT NULL,
	`transactionType` enum('earn','redeem','bonus','expired') NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `points_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`pointsCost` int NOT NULL,
	`discountType` enum('percentage','fixed') NOT NULL,
	`discountValue` int NOT NULL,
	`minTier` enum('bronze','silver','gold','platinum') NOT NULL DEFAULT 'bronze',
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rewards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `chat_rooms` ADD CONSTRAINT `chat_rooms_serviceRequestId_service_requests_id_fk` FOREIGN KEY (`serviceRequestId`) REFERENCES `service_requests`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_rooms` ADD CONSTRAINT `chat_rooms_customerId_users_id_fk` FOREIGN KEY (`customerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_rooms` ADD CONSTRAINT `chat_rooms_technicianId_technicians_id_fk` FOREIGN KEY (`technicianId`) REFERENCES `technicians`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_points` ADD CONSTRAINT `loyalty_points_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_chatRoomId_chat_rooms_id_fk` FOREIGN KEY (`chatRoomId`) REFERENCES `chat_rooms`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_senderId_users_id_fk` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `points_transactions` ADD CONSTRAINT `points_transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `points_transactions` ADD CONSTRAINT `points_transactions_serviceRequestId_service_requests_id_fk` FOREIGN KEY (`serviceRequestId`) REFERENCES `service_requests`(`id`) ON DELETE no action ON UPDATE no action;