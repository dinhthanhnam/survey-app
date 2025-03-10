-- AlterTable
ALTER TABLE `responses` ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `respondent_duration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `respondent_id` INTEGER NOT NULL,
    `total_duration` INTEGER NOT NULL,

    INDEX `respondent_duration_respondent_id_idx`(`respondent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `respondent_duration` ADD CONSTRAINT `respondent_duration_respondent_id_fkey` FOREIGN KEY (`respondent_id`) REFERENCES `respondents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `respondents` RENAME INDEX `credit_fund_id` TO `institution_id`;


CREATE TRIGGER update_responses_updated_at
    BEFORE UPDATE ON responses
    FOR EACH ROW
BEGIN
    IF NEW.question_option_id <> OLD.question_option_id THEN
        SET NEW.updated_at = CURRENT_TIMESTAMP;
END IF;
END