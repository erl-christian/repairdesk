import { prisma } from "../database/prisma"

export class RepairImageRepository {
    async createMany(
        repairRequestId: string,
        urls: string[],
        uploadedBy: "CUSTOMER" | "ADMIN"
    ){
        return prisma.repairImage.createMany({
            data: urls.map(url => ({
                repairRequestId,
                imageUrl: url,
                uploadedBy,
            }))
        })
    }

    async findMany(repairRequestId: string){
        return prisma.repairImage.findMany({
            where: {
                repairRequestId,
            },
        })
    
    }
}

// 2. Renamed the exported instance
export const repairImageRepository = new RepairImageRepository()