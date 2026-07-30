import { RepairStatus } from "../generated/prisma/enums";
import { RepairRequestRepository } from "../repositories/repair-request.repository"
import { RepairRequestQuery } from "../types/query";
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

    async getAllRepairRequest(query: RepairRequestQuery){
        return this.repository.findAll(query)
    }

    async getRepairRequestById(id: string){
        const repairRequest = await this.repository.findById(id)

        if(!repairRequest){
            throw new Error("Repair Request not found")
        }

        return repairRequest
    }

    async updateRepairStatus(id: string, status: RepairStatus){
        await this.getRepairRequestById(id)

        return this.repository.updateStatus(id, status)
    
    }

}