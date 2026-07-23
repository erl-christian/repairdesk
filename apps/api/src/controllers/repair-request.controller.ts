import { Request, Response } from "express"
import { createRepairRequestSchema } from "../validators/repair-request.validator"
import { RepairRequestService } from "../services/repair-request.service"
import { trackRepairSchema } from "../validators/track-repair.validator"

const repairRequestService = new RepairRequestService()

export class RepairRequestController {
    async create(req: Request, res: Response) {
        try{
            const validateData = createRepairRequestSchema.parse(req.body)
            const repairRequest = await repairRequestService.createRepairRequest(validateData)
            return res.status(201).json({
                success: true,
                message: "Repair Request submitted succesfully",
                data: repairRequest,
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                success: false,
                message: "Invalid Request data",
                error: e,
            })
        }
    }

    async track(req: Request, res: Response) {
        try{
            const { ticketNumber, phoneNumber } = trackRepairSchema.parse(req.body)
            const repairRequest = await repairRequestService.trackRepairRequest(ticketNumber, phoneNumber)

            return res.status(200).json({
                success: true,
                data: {
                    ticketNumber:repairRequest.publicTicketNumber,
                    customerName:repairRequest.customerName,
                    deviceType:repairRequest.deviceType,
                    deviceBrand:repairRequest.deviceBrand,
                    deviceModel:repairRequest.deviceModel,
                    status:repairRequest.status,
                    createdAt:repairRequest.createdAt,
                },
            })
        } catch (e) {
            return res.status(404).json({
                success: false,
                message: "Invalid ticket number or phone number",
                error: e,
            })
        
        } 
    }

}