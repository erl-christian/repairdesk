import { prisma } from "../database/prisma"
import { CreateRepairRequestDto } from "../validators/repair-request.validator"

export class RepairRequestRepository {
    async create(
        data: CreateRepairRequestDto & {
            publicTicketNumber: string;
        }
    ) {
        return await prisma.repairRequest.create({
            data,
        })
    }

    async findByTicketNumber(ticketNumber: string){
        return prisma.repairRequest.findUnique({
            where: {
                publickTicketNumber: ticketNumber,
            }
        })
    }

}