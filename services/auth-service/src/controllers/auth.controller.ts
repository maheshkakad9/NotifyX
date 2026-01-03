import { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { success, error } from "../utils/response.js";

export const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const tokens = await authService.register(name, email, password);
            success(res, "User Registered", tokens);
        } catch (err: any) {
            error(res, err.message);
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const tokens = await authService.login(email, password);
            success(res, "Login Successful", tokens);
        } catch (err: any) {
            error(res, err.message);
        }
    },
};