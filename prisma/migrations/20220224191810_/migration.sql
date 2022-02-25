/*
  Warnings:

  - You are about to drop the column `delete` on the `role` table. All the data in the column will be lost.
  - Added the required column `delt` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `role` DROP COLUMN `delete`,
    ADD COLUMN `delt` BOOLEAN NOT NULL;
