import { z } from "zod"

export const updateRepairStatusSchema = z.object({
    status: z.enum([
        "PENDING_REVIEW",
        "ACCEPTED",
        "IN_PROGRESS",
        "WAITING_PARTS",
        "COMPLETED",
        "CANCELLED",
    ])
})

export type UpdateRepairStatusDto = z.infer<typeof updateRepairStatusSchema>