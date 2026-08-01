import { prisma } from "../database/prisma";

export class AuthRepository {
    async findByUsername(username: string){
        return prisma.admin.findUnique({
            where: {
                username
            }
        })
    }
}

export const authRepository = new AuthRepository()