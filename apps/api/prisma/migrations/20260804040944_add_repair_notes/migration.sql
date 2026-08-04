-- CreateTable
CREATE TABLE "RepairNote" (
    "id" TEXT NOT NULL,
    "repairRequestId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepairNote" ADD CONSTRAINT "RepairNote_repairRequestId_fkey" FOREIGN KEY ("repairRequestId") REFERENCES "RepairRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
