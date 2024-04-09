-- CreateTable
CREATE TABLE "productGallery" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "productGallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productGallery" ADD CONSTRAINT "productGallery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
