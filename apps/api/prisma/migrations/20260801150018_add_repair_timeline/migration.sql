-- CreateTable
CREATE TABLE "RepairTimeline" (
    "id" TEXT NOT NULL,
    "repairRequestId" TEXT NOT NULL,
    "status" "RepairStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepairTimeline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepairTimeline" ADD CONSTRAINT "RepairTimeline_repairRequestId_fkey" FOREIGN KEY ("repairRequestId") REFERENCES "RepairRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
