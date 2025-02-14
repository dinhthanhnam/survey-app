-- CreateTable
CREATE TABLE `credit_funds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `identity_code` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `identity_code`(`identity_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `question_type` ENUM('text', 'radiogroup', 'checkbox', 'dropdown', 'rating', 'boolean', 'date', 'datetime', 'file') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `respondents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `credit_fund_id` INTEGER NOT NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `credit_fund_id`(`credit_fund_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surveys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `survey_title` TEXT NOT NULL,
    `survey_description` TEXT NULL,
    `show_questions_number` ENUM('onPage') NULL,
    `credit_fund_id` INTEGER NOT NULL,

    INDEX `credit_fund_id`(`credit_fund_id`),
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
    `response` LONGTEXT NULL,

    INDEX `question_id`(`question_id`),
    INDEX `respondent_id`(`respondent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `question_survey` ADD CONSTRAINT `question_survey_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question_survey` ADD CONSTRAINT `question_survey_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `respondents` ADD CONSTRAINT `respondents_ibfk_1` FOREIGN KEY (`credit_fund_id`) REFERENCES `credit_funds`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `surveys` ADD CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`credit_fund_id`) REFERENCES `credit_funds`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question_options` ADD CONSTRAINT `question_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `responses_ibfk_2` FOREIGN KEY (`respondent_id`) REFERENCES `respondents`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
