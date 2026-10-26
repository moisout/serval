CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `questions` ADD `order` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
-- Keep the current order (insertion order) for existing questions
UPDATE `questions` SET `order` = (
	SELECT COUNT(*) FROM `questions` AS `previous`
	WHERE `previous`.`exercise_id` = `questions`.`exercise_id`
	AND `previous`.`rowid` < `questions`.`rowid`
);
