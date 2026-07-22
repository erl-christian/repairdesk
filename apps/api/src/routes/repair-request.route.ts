import { Router } from "express";
import { RepairRequestController } from "../controllers/repair-request.controller";

const router = Router();

const repairRequestController = new RepairRequestController();

router.post( "/", repairRequestController.create.bind(repairRequestController));

export default router;