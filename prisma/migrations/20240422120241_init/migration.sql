/*
  Warnings:

  - A unique constraint covering the columns `[postal_code]` on the table `userAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userAddress_postal_code_key" ON "userAddress"("postal_code");
