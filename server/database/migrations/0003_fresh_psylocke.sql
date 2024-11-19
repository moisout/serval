ALTER TABLE `exercises` ADD `created_at` integer DEFAULT (unixepoch()) NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` ADD `created_at` integer DEFAULT (unixepoch()) NOT NULL;