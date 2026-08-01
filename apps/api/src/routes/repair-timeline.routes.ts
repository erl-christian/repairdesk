import { Router } from "express";
import { repairTimelineController } from "../controllers/repair-timeline.controller";

const router = Router();

router.get("/:id/timeline",repairTimelineController.getTimeline);

export default router;