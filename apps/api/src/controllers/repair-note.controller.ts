import { Request, Response } from "express";
import { repairNoteService } from "../services/repair-note.service";
import {
    createRepairNoteSchema,
    updateRepairNoteSchema,
} from "../validators/repair-note.validator";

class RepairNoteController {
    async create(req: Request, res: Response) {
        try {
            // Cast to string to satisfy TypeScript
            const repairRequestId = req.params.repairRequestId as string;

            const body = createRepairNoteSchema.parse(req.body);

            const repairNote = await repairNoteService.createRepairNote(
                repairRequestId,
                body.note
            );

            return res.status(201).json({
                success: true,
                message: "Repair note created successfully.",
                data: repairNote,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create repair note.",
                error,
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const repairRequestId = req.params.repairRequestId as string;

            const repairNotes = await repairNoteService.getRepairNotes(
                repairRequestId
            );

            return res.status(200).json({
                success: true,
                data: repairNotes,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve repair notes.",
                error,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const noteId = req.params.noteId as string;

            const body = updateRepairNoteSchema.parse(req.body);

            const repairNote = await repairNoteService.updateRepairNote(
                noteId,
                body.note
            );

            return res.status(200).json({
                success: true,
                message: "Repair note updated successfully.",
                data: repairNote,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to update repair note.",
                error,
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const noteId = req.params.noteId as string;

            await repairNoteService.deleteRepairNote(noteId);

            return res.status(200).json({
                success: true,
                message: "Repair note deleted successfully.",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete repair note.",
                error,
            });
        }
    }
}

export const repairNoteController = new RepairNoteController();