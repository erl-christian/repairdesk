import { Router } from "express";
import { RepairRequestController } from "../controllers/repair-request.controller";

const router = Router();

const repairRequestController = new RepairRequestController();

//post
router.post( "/", repairRequestController.create.bind(repairRequestController));
router.post("/track", repairRequestController.track.bind(repairRequestController));


//get
router.get("/", repairRequestController.findAll.bind(repairRequestController));
router.get("/:id", repairRequestController.findOne.bind(repairRequestController));


//patch
router.patch("/:id/status", repairRequestController.updateStatus.bind(repairRequestController));
export default router;