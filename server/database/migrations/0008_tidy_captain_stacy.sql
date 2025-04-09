CREATE TABLE `results` (
	`id` text PRIMARY KEY NOT NULL,
	`exercise_id` text NOT NULL,
	`user_id` text NOT NULL,
	`question_id` text NOT NULL,
	`answer` text NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE no action
);
