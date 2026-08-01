import { Request, Response } from "express";
import { repairTimelineService } from "../services/repair-timeline.service";
class RepairTimelineController {
  async getTimeline(req: Request, res: Response) {
    const { id } = req.params;
    const timeline = await repairTimelineService.getTimeline(id as string);

    return res.json({
      success: true,
      data: timeline,
    });
  }
}

export const repairTimelineController = new RepairTimelineController();
