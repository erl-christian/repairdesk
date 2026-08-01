import { RepairStatus } from "../generated/prisma/enums";


export interface RepairRequestQuery{
    page?: number,
    limit?: number,
    search?: string,
    status?: RepairStatus,

    sortBy?: "createdAt" | "customerName" | "status"
    sortOrder?: "asc" | "desc"
}