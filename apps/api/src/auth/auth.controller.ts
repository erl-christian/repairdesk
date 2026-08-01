import { Request, Response } from "express"
import { authService } from "./auth.service"
import { loginSchema } from "./auth.validator"

export class AuthController {
    async login(req: Request, res: Response) {
        try{
            const data = loginSchema.parse(req.body)

            const result = await authService.login(data)

            return res.status(200).json({
                success: true,
                message: "Log in Successfully",
                ...result
            })

        }catch(e){
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }
    }
}

export const authController = new AuthController()