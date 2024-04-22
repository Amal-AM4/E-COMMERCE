-- CreateTable
CREATE TABLE "userAddress" (
    "id" SERIAL NOT NULL,
    "address_line" TEXT NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "postal_code" INTEGER NOT NULL,
    "county" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
