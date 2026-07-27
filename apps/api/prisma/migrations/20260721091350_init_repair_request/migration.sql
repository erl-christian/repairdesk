-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('PENDING_REVIEW', 'ACCEPTED', 'IN_PROGRESS', 'WAITING_PARTS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceMethod" AS ENUM ('TECHNICIAN_VISITS_CUSTOMER', 'CUSTOMER_VISITS_TECHNICIAN');

-- CreateTable
CREATE TABLE "RepairRequest" (
    "id" TEXT NOT NULL,
    "publicTicketNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "deviceType" TEXT NOT NULL,
    "deviceBrand" TEXT,
    "deviceModel" TEXT,
    "problemDescription" TEXT NOT NULL,
    "serviceMethod" "ServiceMethod" NOT NULL,
    "municipality" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "preferredTime" TEXT,
    "status" "RepairStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepairRequest_publicTicketNumber_key" ON "RepairRequest"("publicTicketNumber");
