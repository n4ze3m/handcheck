-- AlterTable
ALTER TABLE "CampaignResponse" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymend_id" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT E'PENDING',
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DEFAULT E'Anonymous';

-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "payment_id" TEXT DEFAULT E'-';
