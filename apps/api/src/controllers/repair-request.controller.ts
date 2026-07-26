import { Request, Response } from "express"
import { createRepairRequestSchema } from "../validators/repair-request.validator"
import { RepairRequestService } from "../services/repair-request.service"
import { trackRepairSchema } from "../validators/track-repair.validator"
import { updateRepairStatusSchema } from "../validators/update-repair.validator"

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

    async findAll(req: Request, res: Response) {
        try{
            const repairRequests = await repairRequestService.getAllRepairRequest()
            return res.status(200).json({
                success: true,
                data: repairRequests,
            })
            
        } catch (e) { 
            return res.status(500).json({
                success: false,
                message: "Repair requests not found",
                error: e,
            })
        }
    }

    async findOne(req: Request, res: Response) {
        try{
            const repairRequest = await repairRequestService.getRepairRequestById(req.params.id as string)
            
            return res.status(200).json({
                success: true,
                data: repairRequest,
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "Repair request not found",
                error: e,
            })
        }
    }

    async updateStatus(req: Request, res: Response) {
        try{
            const { status } = updateRepairStatusSchema.parse(req.body)
            const repairRequest = await repairRequestService.updateRepairStatus(req.params.id as string, status)

            return res.status(200).json({
                success: true,
                message: "Repair status updated succesfully",
                data: repairRequest
            })
        }catch (e) {
            return res.status(400).json({
                success: false,
                message: "Invalid request data",
                error: e,
            })
        }
    }

}