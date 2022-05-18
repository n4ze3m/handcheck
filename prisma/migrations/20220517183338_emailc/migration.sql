-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "EmailCheckout" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "checkout_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailCheckout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmailCheckout" ADD CONSTRAINT "EmailCheckout_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailCheckout" ADD CONSTRAINT "EmailCheckout_checkout_id_fkey" FOREIGN KEY ("checkout_id") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
