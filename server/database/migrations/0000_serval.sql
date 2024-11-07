CREATE TABLE `exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`author_id` text NOT NULL,
	`topic` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`order` integer NOT NULL,
	`exercise_id` text NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`role` text NOT NULL,
	`password` text NOT NULL,
	`auth_token` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
