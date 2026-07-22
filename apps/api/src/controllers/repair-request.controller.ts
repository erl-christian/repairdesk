import { Request, Response } from "express"
import { createRepairRequestSchema } from "../validators/repair-request.validator"
import { RepairRequestService } from "../services/repair-request.service"

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
}