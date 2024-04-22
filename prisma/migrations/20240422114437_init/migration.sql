/*
  Warnings:

  - You are about to drop the column `county` on the `userAddress` table. All the data in the column will be lost.
  - Added the required column `country` to the `userAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userAddress" DROP COLUMN "county",
ADD COLUMN     "country" VARCHAR(255) NOT NULL;
