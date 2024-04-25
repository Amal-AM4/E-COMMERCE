/*
  Warnings:

  - Added the required column `cardCVV` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardExp` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardHolderName` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardNumber` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "cardCVV" TEXT NOT NULL,
ADD COLUMN     "cardExp" TEXT NOT NULL,
ADD COLUMN     "cardHolderName" TEXT NOT NULL,
ADD COLUMN     "cardNumber" TEXT NOT NULL;
