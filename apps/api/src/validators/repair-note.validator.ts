import { z } from "zod";

export const createRepairNoteSchema = z.object({
  note: z
    .string()
    .trim()
    .min(1, "Note is required")
    .max(5000, "Note must not exceed 5000 characters"),
});

export const updateRepairNoteSchema = createRepairNoteSchema;

export type CreateRepairNoteInput = z.infer<typeof createRepairNoteSchema>;
export type UpdateRepairNoteInput = z.infer<typeof updateRepairNoteSchema>;