-- AlterTable
ALTER TABLE `question_options` ADD COLUMN `weighted_value` DOUBLE NULL;

-- AlterTable
ALTER TABLE `questions` ADD COLUMN `weighted_percentage` DOUBLE NULL;
