import { RepairRequestRepository } from "../repositories/repair-request.repository"
import { CreateRepairRequestDto } from "../validators/repair-request.validator";

export class RepairRequestService {
    private repository = new RepairRequestRepository()

    private generateTicketNumber() {
        const year = new Date().getFullYear()

        const random = Math.floor(1000 + Math.random() * 9000)

        return `RD-BHL-${year}-${random}`
    
    }

    async createRepairRequest(
        data: CreateRepairRequestDto
    ) {
        const publicTicketNumber = this.generateTicketNumber()

        return this.repository.create({
            ...data,
            publicTicketNumber,
        })
    }

    async findByTicketNumber(ticketNumber: string) {
        return await this.repository.findByTicketNumber(ticketNumber)
    }

    async trackRepairRequest(
        ticketNumber: string,
        phoneNumber: string,
    ) {
        const repairRequest = await this.repository.findForTracking(
            ticketNumber,
            phoneNumber,
        )

        if(!repairRequest){
            throw new Error("Invalid ticket number or phone number")
        }

        return repairRequest
    }
}