import { prisma } from "../database/prisma"
import { RepairStatus } from "../generated/prisma/enums"

export class RepairTimelineRepository {
    async create(data:{
        repairRequestId: string,
        status: RepairStatus,
        note?: string
    }){
        return await prisma.repairTimeline.create({
            data,
        })
    }

    async findByRepairRequestId(repairRequestId: string){
        return await prisma.repairTimeline.findMany({
            where: {
                repairRequestId,
            },
            orderBy: {
                createdAt: "asc",
            },
        })
    }

}

export const repairTimelineRepository = new RepairTimelineRepository()