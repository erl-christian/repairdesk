import { z } from "zod"

export const repairRequestQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
});

export type RepairRequestQuery = z.infer<
  typeof repairRequestQuerySchema
>;