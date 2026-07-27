import { prisma } from "../database/prisma"

export class DashboardRepository{
    async getStatistics() {
        const [
            totalRequests,
            pendingReview,
            accepted,
            inProgress,
            waitingForParts,
            readyForPickup,
            completed,
            cancelled,
        ] = await Promise.all([
            prisma.repairRequest.count(),

            prisma.repairRequest.count({
                where: {
                status: "PENDING_REVIEW",
                },
            }),

            prisma.repairRequest.count({
                where: {
                status: "ACCEPTED",
                },
            }),

            prisma.repairRequest.count({
                where: {
                status: "IN_PROGRESS",
                },
            }),

            prisma.repairRequest.count({
                where: {
                status: "WAITING_PARTS",
                },
            }),

            prisma.repairRequest.count({
                where: {
                status: "READY_FOR_PICKUP",
                },
            }),

            prisma.repairRequest.count({
                where: {
                status: "COMPLETED",
                },
            }),

            prisma.repairRequest.count({
                where: {
                status: "CANCELLED",
                },
            }),
        ])

        return {
            totalRequests,
            pendingReview,
            accepted,
            inProgress,
            waitingForParts,
            readyForPickup,
            completed,
            cancelled,
        }
    }
}

export const dashboardRepository = new DashboardRepository();