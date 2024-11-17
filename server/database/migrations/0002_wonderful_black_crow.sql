CREATE TABLE `access_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
