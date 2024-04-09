-- CreateTable
CREATE TABLE "adminUser" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" VARCHAR(60) NOT NULL,
    "last_name" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adminUser_username_key" ON "adminUser"("username");
