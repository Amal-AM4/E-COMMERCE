/*
  Warnings:

  - You are about to drop the column `cardCVV` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `cardExp` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "cardCVV",
DROP COLUMN "cardExp",
DROP COLUMN "cardNumber";
