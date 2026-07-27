import { Request, Response } from "express"
import { dashboardService } from "../services/dashboard.service"

export class DashboardController {
    async getStatistics(req: Request, res: Response) {
        try{
            const statistics = await dashboardService.getDashboardStatistic()
            return res.status(200).json({
                success: true,
                data: statistics,
            })
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "Cannot get statistics",
                error: e,
            })
        }
    }
}

export const dashboardController = new DashboardController()




