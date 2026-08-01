import { z } from "zod"
import { RepairStatus } from "../generated/prisma/enums";

export const repairRequestQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  status: z.enum(
    Object.values(RepairStatus) as [RepairStatus, ...RepairStatus[]]
  ).optional(),

  sortBy: z.enum(["createdAt", "customerName", "status"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"), 
});

export type RepairRequestQuery = z.infer<
  typeof repairRequestQuerySchema
>;