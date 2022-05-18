/*
  Warnings:

  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormFields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubmittedFormFields` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormFields" DROP CONSTRAINT "FormFields_formId_fkey";

-- DropForeignKey
ALTER TABLE "FormRequest" DROP CONSTRAINT "FormRequest_formId_fkey";

-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_formId_fkey";

-- DropForeignKey
ALTER TABLE "SubmittedFormFields" DROP CONSTRAINT "SubmittedFormFields_formFieldId_fkey";

-- DropForeignKey
ALTER TABLE "SubmittedFormFields" DROP CONSTRAINT "SubmittedFormFields_submissionId_fkey";

-- DropTable
DROP TABLE "Form";

-- DropTable
DROP TABLE "FormFields";

-- DropTable
DROP TABLE "FormRequest";

-- DropTable
DROP TABLE "Submissions";

-- DropTable
DROP TABLE "SubmittedFormFields";

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "initialAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "targetAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rapydSecretToken" TEXT NOT NULL,
    "rapydAccessToken" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignResponse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "comment" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "checkout_id" TEXT NOT NULL,
    "displayToPublic" BOOLEAN NOT NULL DEFAULT true,
    "campaign_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_url_key" ON "Campaign"("url");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignResponse" ADD CONSTRAINT "CampaignResponse_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
