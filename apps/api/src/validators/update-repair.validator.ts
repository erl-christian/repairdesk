import { z } from "zod";
import { RepairStatus } from "../generated/prisma/enums";

export const updateRepairStatusSchema = z.object({
  status: z.nativeEnum(RepairStatus),
  note: z.string().trim().optional(),
});
