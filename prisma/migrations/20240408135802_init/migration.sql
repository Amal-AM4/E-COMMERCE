-- CreateTable
CREATE TABLE "productCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "productCategory_pkey" PRIMARY KEY ("id")
);
