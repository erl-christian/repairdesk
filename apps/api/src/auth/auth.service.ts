import bcrypt from "bcrypt"
import jwt, { SignOptions } from "jsonwebtoken"

import { authRepository } from "./auth.repository"
import type { LoginInput } from "./auth.validator"

export class AuthService {
    async login(input: LoginInput) {
        const admin = await authRepository.findByUsername(input.username)

        if (!admin) {
            throw new Error("Invalid credentials")
        }

        const passwordMatch = await bcrypt.compare(input.password, admin.passwordHash)

        if (!passwordMatch) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"], }
        )

        return {
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
            }

        }
    }
}

export const authService = new AuthService()