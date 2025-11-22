-- AlterTable
ALTER TABLE `farmaceutico` ADD COLUMN `ResetToken` VARCHAR(191) NULL,
    ADD COLUMN `ResetTokenExpira` DATETIME(3) NULL;
