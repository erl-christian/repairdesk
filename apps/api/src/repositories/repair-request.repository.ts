import { prisma } from "../database/prisma";
import { RepairStatus } from "../generated/prisma/enums";
import { CreateRepairRequestDto } from "../validators/repair-request.validator";

export class RepairRequestRepository {
  async create(
    data: CreateRepairRequestDto & {
      publicTicketNumber: string;
    },
  ) {
    return await prisma.repairRequest.create({
      data,
    });
  }

  async findByTicketNumber(ticketNumber: string) {
    return prisma.repairRequest.findUnique({
      where: {
        publicTicketNumber: ticketNumber,
      },
    });
  }

  async findForTracking(ticketNumber: string, phoneNumber: string) {
    return prisma.repairRequest.findFirst({
      where: {
        publicTicketNumber: ticketNumber,
        phoneNumber,
      },
    });
  }

  async findAll() {
    return prisma.repairRequest.findMany({
      select: {
        publicTicketNumber: true,
        customerName: true,
        deviceType: true,
        deviceBrand: true,
        deviceModel: true,
        problemDescription: true,
        createdAt: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.repairRequest.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: string, status: RepairStatus) {
    return prisma.repairRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
