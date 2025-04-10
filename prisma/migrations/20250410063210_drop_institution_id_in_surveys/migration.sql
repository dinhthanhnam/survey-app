/*
  Warnings:

  - You are about to drop the column `institution_id` on the `surveys` table. All the data in the column will be lost.
  - Added the required column `belongs_to_pillar` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `surveys` DROP FOREIGN KEY `surveys_ibfk_1`;

-- DropIndex
DROP INDEX `institution_id` ON `surveys`;

-- AlterTable
ALTER TABLE `questions` ADD COLUMN `belongs_to_pillar` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `surveys` DROP COLUMN `institution_id`;

-- CreateTable
CREATE TABLE `survey_pillars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `weighted_percentage` DOUBLE NULL,
    `survey_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `survey_pillars` ADD CONSTRAINT `pillar_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`belongs_to_pillar`) REFERENCES `survey_pillars`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
