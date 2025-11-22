/*
  Warnings:

  - Added the required column `Senha_Hash` to the `farmaceutico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `farmaceutico` ADD COLUMN `Senha_Hash` VARCHAR(191) NOT NULL;
