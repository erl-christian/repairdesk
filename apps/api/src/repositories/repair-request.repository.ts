import { prisma } from "../database/prisma";
import { RepairStatus } from "../generated/prisma/enums";
import { CreateRepairRequestDto } from "../validators/repair-request.validator";
import { RepairRequestQuery } from "../types/query";

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

  async findAll(query: RepairRequestQuery) {
    const page = query.page ?? 1
    const limit = query.limit ?? 10

    const skip = (page - 1) * limit

    const [repairRequests, totalItems] = await Promise.all([
      prisma.repairRequest.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.repairRequest.count(),
    ])

    return {
      repairRequests,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      }
    }

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
