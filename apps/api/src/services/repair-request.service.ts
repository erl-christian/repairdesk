import { RepairStatus } from "../generated/prisma/enums";
import { RepairRequestRepository } from "../repositories/repair-request.repository";
import { RepairRequestQuery } from "../types/query";
import { repairTimelineService } from "./repair-timeline.service";
import { CreateRepairRequestDto } from "../validators/repair-request.validator";
import { uploadBuffer } from "../services/repair-image.service";
import { RepairImageRepository } from "../repositories/repair-image.repository";


export class RepairRequestService {
  private repository = new RepairRequestRepository();

  private imageRepository = new RepairImageRepository();

  private generateTicketNumber() {
    const year = new Date().getFullYear();

    const random = Math.floor(1000 + Math.random() * 9000);

    return `RD-BHL-${year}-${random}`;
  }

  async createRepairRequest(
    data: CreateRepairRequestDto,
    files: Express.Multer.File[]
  ) {
    const publicTicketNumber = this.generateTicketNumber();

    const repairRequest = await this.repository.create({
      customerName: data.customerName,
      phoneNumber: data.phoneNumber,
      email: data.email || null,

      deviceType: data.deviceType,
      deviceBrand: data.deviceBrand || null,
      deviceModel: data.deviceModel || null,

      problemDescription: data.problemDescription,

      serviceMethod: data.serviceMethod,

      municipality: data.municipality,

      preferredDate: data.preferredDate
        ? new Date(data.preferredDate)
        : null,

      preferredTime: data.preferredTime || null,

      publicTicketNumber,
    });

    if (files && files.length > 0) {
      const urls: string[] = [];

      for (const file of files) {
        const url = await uploadBuffer(file.buffer);
        urls.push(url);
      }

      await this.imageRepository.createMany(
        repairRequest.id,
        urls,
        "CUSTOMER"
      );
    }

    await repairTimelineService.createTimeline(
      repairRequest.id,
      repairRequest.status,
      "Repair request submitted."
    );

    return repairRequest;
  }

  async findByTicketNumber(ticketNumber: string) {
    return await this.repository.findByTicketNumber(ticketNumber);
  }

  async trackRepairRequest(ticketNumber: string, phoneNumber: string) {
    const repairRequest = await this.repository.findForTracking(
      ticketNumber,
      phoneNumber,
    );

    if (!repairRequest) {
      throw new Error("Invalid ticket number or phone number");
    }

    return repairRequest;
  }

  async getAllRepairRequest(query: RepairRequestQuery) {
    return this.repository.findAll(query);
  }

  async getRepairRequestById(id: string) {
    const repairRequest = await this.repository.findById(id);

    if (!repairRequest) {
      throw new Error("Repair Request not found");
    }

    return repairRequest;
  }

  async updateRepairStatus(id: string, status: RepairStatus, note?: string) {
    await this.getRepairRequestById(id);

    const repairRequest = await this.repository.updateStatus(id, status);

    await repairTimelineService.createTimeline(repairRequest.id, status, note);

    return repairRequest;
  }
}
