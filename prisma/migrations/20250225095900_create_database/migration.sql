-- CreateTable
CREATE TABLE `question_survey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `survey_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,

    INDEX `question_id`(`question_id`),
    INDEX `survey_id`(`survey_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_name` VARCHAR(255) NOT NULL,
    `question_text` TEXT NOT NULL,
    `question_note` TEXT NULL,
    `question_type` ENUM('text', 'radiogroup', 'checkbox', 'dropdown', 'rating', 'boolean', 'date', 'datetime', 'file', 'group') NOT NULL,
    `question_target` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `respondents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `auth_status` VARCHAR(255) NOT NULL,
    `institution_id` INTEGER NOT NULL,
    `belong_to_group` ENUM('Lãnh đạo & Quản lý', 'Cán bộ nghiệp vụ', 'Nhân viên CNTT & Hỗ trợ kỹ thuật') NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `phone`(`phone`),
    INDEX `credit_fund_id`(`institution_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surveys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `survey_title` TEXT NOT NULL,
    `survey_description` TEXT NULL,
    `institution_id` INTEGER NOT NULL,

    INDEX `institution_id`(`institution_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `option_text` VARCHAR(255) NOT NULL,
    `option_value` INTEGER NULL,
    `option_note` VARCHAR(255) NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `respondent_id` INTEGER NOT NULL,
    `question_option_id` INTEGER NOT NULL,

    INDEX `question_id`(`question_id`),
    INDEX `respondent_id`(`respondent_id`),
    INDEX `fk_response_question_option`(`question_option_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `institutions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `identity_code` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `identity_code`(`identity_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtpToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `otpHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `question_survey` ADD CONSTRAINT `question_survey_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question_survey` ADD CONSTRAINT `question_survey_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `respondents` ADD CONSTRAINT `respondents_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `surveys` ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question_options` ADD CONSTRAINT `question_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `fk_response_question_option` FOREIGN KEY (`question_option_id`) REFERENCES `question_options`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_ibfk_2` FOREIGN KEY (`respondent_id`) REFERENCES `respondents`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question_group` ADD CONSTRAINT `question_group_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TRIGGER update_option_order
    BEFORE INSERT ON question_options
    FOR EACH ROW
BEGIN
    DECLARE max_value INT;

    -- Lấy giá trị option_order lớn nhất cho question_id hiện tại
    SELECT COALESCE(MAX(option_value), 0) INTO max_value
    FROM question_options
    WHERE question_id = NEW.question_id;

    -- Tăng giá trị option_order lên 1 cho bản ghi mới
    SET NEW.option_value = max_value + 1;
END