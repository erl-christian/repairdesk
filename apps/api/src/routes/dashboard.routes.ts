import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";

const router = Router();

//get 
router.get("/stats", dashboardController.getStatistics.bind(dashboardController));

export default router;