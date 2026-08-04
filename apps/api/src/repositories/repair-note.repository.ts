import { prisma } from "../database/prisma";

class RepairNoteRepository {

    async create(repairRequestId: string, note: string) {

        return prisma.repairNote.create({
            data: {
                repairRequestId,
                note,
            },
        });

    }

    async findAll(repairRequestId: string) {

        return prisma.repairNote.findMany({
            where: {
                repairRequestId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

    }

    async findById(id: string) {

        return prisma.repairNote.findUnique({
            where: {
                id,
            },
        });

    }

    async update(id: string, note: string) {

        return prisma.repairNote.update({
            where: {
                id,
            },
            data: {
                note,
            },
        });

    }

    async delete(id: string) {

        return prisma.repairNote.delete({
            where: {
                id,
            },
        });

    }

}

export const repairNoteRepository = new RepairNoteRepository();