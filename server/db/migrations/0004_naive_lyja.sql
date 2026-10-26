PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`author_id` text NOT NULL,
	`topic` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_exercises`("id", "name", "author_id", "topic", "created_at") SELECT "id", "name", "author_id", "topic", "created_at" FROM `exercises`;--> statement-breakpoint
DROP TABLE `exercises`;--> statement-breakpoint
ALTER TABLE `__new_exercises` RENAME TO `exercises`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`order` integer NOT NULL,
	`exercise_id` text NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_questions`("id", "order", "exercise_id", "question", "answer", "created_at") SELECT "id", "order", "exercise_id", "question", "answer", "created_at" FROM `questions`;--> statement-breakpoint
DROP TABLE `questions`;--> statement-breakpoint
ALTER TABLE `__new_questions` RENAME TO `questions`;