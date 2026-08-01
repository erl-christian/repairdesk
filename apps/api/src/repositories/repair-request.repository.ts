import { prisma } from "../database/prisma";
import { RepairStatus } from "../generated/prisma/enums";
import { CreateRepairRequestDto } from "../validators/repair-request.validator";
import { RepairRequestQuery } from "../types/query";
import { Prisma } from "../generated/prisma/client";

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

    const { search, status } = query

    const where: Prisma.RepairRequestWhereInput = {}

    const orderBy = { [query.sortBy ?? "createdAt"]: query.sortOrder ?? "desc", }

    if(search){
    where.OR = [
      {
        customerName: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        publicTicketNumber: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        phoneNumber: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        deviceBrand: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        deviceModel: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    ]
    }

    if(status){
      where.status = status
    }



    const [repairRequests, totalItems] = await Promise.all([
      prisma.repairRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.repairRequest.count({
        where,
      }),
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
