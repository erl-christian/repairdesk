-- CreateEnum
CREATE TYPE "AttachmentUploader" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateTable
CREATE TABLE "RepairImage" (
    "id" TEXT NOT NULL,
    "repairRequestId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "uploadedBy" "AttachmentUploader" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepairImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepairImage" ADD CONSTRAINT "RepairImage_repairRequestId_fkey" FOREIGN KEY ("repairRequestId") REFERENCES "RepairRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
