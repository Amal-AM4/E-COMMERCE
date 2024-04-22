/*
  Warnings:

  - You are about to drop the column `userId` on the `userAddress` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `userAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userAddress" DROP CONSTRAINT "userAddress_userId_fkey";

-- AlterTable
ALTER TABLE "userAddress" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
