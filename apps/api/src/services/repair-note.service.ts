import { repairNoteRepository } from "../repositories/repair-note.repository";

class RepairNoteService {

    async createRepairNote(
        repairRequestId: string,
        note: string
    ) {

        return repairNoteRepository.create(
            repairRequestId,
            note
        );

    }

    async getRepairNotes(
        repairRequestId: string
    ) {

        return repairNoteRepository.findAll(
            repairRequestId
        );

    }

    async updateRepairNote(
        noteId: string,
        note: string
    ) {

        const repairNote =
            await repairNoteRepository.findById(noteId);

        if (!repairNote) {
            throw new Error("Repair note not found");
        }

        return repairNoteRepository.update(
            noteId,
            note
        );

    }

    async deleteRepairNote(
        noteId: string
    ) {

        const repairNote =
            await repairNoteRepository.findById(noteId);

        if (!repairNote) {
            throw new Error("Repair note not found");
        }

        await repairNoteRepository.delete(noteId);

    }

}

export const repairNoteService =
new RepairNoteService();