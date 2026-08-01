import type { RepairStatus } from "../generated/prisma/enums";
import { repairTimelineRepository } from "../repositories/repair-timeline.repository";

class RepairTimelineService {
  async createTimeline(
    repairRequestId: string,
    status: RepairStatus,
    note?: string,
  ) {
    return repairTimelineRepository.create({
      repairRequestId,
      status,
      note,
    });
  }
  async getTimeline(repairRequestId: string) {
    return repairTimelineRepository.findByRepairRequestId(repairRequestId);
  }
}

export const repairTimelineService = new RepairTimelineService();
