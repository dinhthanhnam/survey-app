-- DropForeignKey
ALTER TABLE `respondents` DROP FOREIGN KEY `respondents_ibfk_1`;

-- DropIndex
DROP INDEX `email` ON `respondents`;

-- AddForeignKey
ALTER TABLE `respondents` ADD CONSTRAINT `respondents_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
