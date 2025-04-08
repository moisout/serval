ALTER TABLE `questions` RENAME COLUMN "correctAnswer" TO "correct_answer";--> statement-breakpoint
ALTER TABLE `questions` ADD `additional_text` text;