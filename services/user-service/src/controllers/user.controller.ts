import { Request, Response } from "express";
import { userService } from "../services/user.service.js";
import { success, error } from "../utils/response.js";

export const userController = {
    profile: async (req: Request, res: Response) => {
        try {
            const user = await userService.getProfile(req.user!.userId);
            success(res, "Profile fetched", user);
        } catch (err: any) {
            error(res, err.message);
        }
    },

    updatePreferences: async (req: Request, res: Response) => {
        try {
            const user = await userService.updatePreferences(req.user!.userId, req.body);
            success(res, "Preferences updated", user);
        } catch (err: any) {
            error(res,err.message);
        }
    }
};