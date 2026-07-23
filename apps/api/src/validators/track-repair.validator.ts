import { z } from "zod"

export const trackRepairSchema = z.object({
    ticketNumber: z.string().min(1),
    phoneNumber: z.string().min(1),
})

export type TrackRepairDto = z.infer<typeof trackRepairSchema>