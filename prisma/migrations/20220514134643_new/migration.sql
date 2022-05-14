/*
  Warnings:

  - You are about to drop the column `telegramToken` on the `Store` table. All the data in the column will be lost.
  - Added the required column `country` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "telegramToken",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL;
