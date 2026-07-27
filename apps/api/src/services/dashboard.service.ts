import { dashboardRepository } from "../repositories/dashboard.repository"

export class DashboardSevice {
    async getDashboardStatistic() {
        return dashboardRepository.getStatistics()
    }
}

export const dashboardService = new DashboardSevice()