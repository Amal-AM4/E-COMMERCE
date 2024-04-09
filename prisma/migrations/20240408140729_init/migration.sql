-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumb_img" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dicount_price" DECIMAL(65,30) NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_pid_key" ON "product"("pid");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "productCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
