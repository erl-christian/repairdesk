import { Router } from "express";

import { repairNoteController } from "../controllers/repair-note.controller";

import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use(authenticate);

router.post(
    "/repair-requests/:repairRequestId/notes",
    repairNoteController.create
);

router.get(
    "/repair-requests/:repairRequestId/notes",
    repairNoteController.getAll
);

router.patch(
    "/repair-notes/:noteId",
    repairNoteController.update
);

router.delete(
    "/repair-notes/:noteId",
    repairNoteController.delete
);

export default router;