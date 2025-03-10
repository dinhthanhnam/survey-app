-- AlterTable: Thêm cột updated_at vào bảng responses
ALTER TABLE `responses`
ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable: Tạo bảng respondent_duration
CREATE TABLE `respondent_duration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `respondent_id` INTEGER NOT NULL,
    `total_duration` INTEGER NOT NULL,
    INDEX `respondent_duration_respondent_id_idx`(`respondent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey: Thêm khóa ngoại vào respondent_duration
ALTER TABLE `respondent_duration`
ADD CONSTRAINT `respondent_duration_respondent_id_fkey`
FOREIGN KEY (`respondent_id`) REFERENCES `respondents`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Đổi tên index trong bảng respondents
ALTER TABLE `respondents`
DROP INDEX `credit_fund_id`,
ADD INDEX `institution_id` (`institution_id`);

-- Tạo trigger update_responses_updated_at
CREATE TRIGGER update_responses_updated_at
BEFORE UPDATE ON responses
FOR EACH ROW BEGIN
    IF NEW.question_option_id <> OLD.question_option_id THEN
        SET NEW.updated_at = CURRENT_TIMESTAMP(3);
    END IF;
END;


