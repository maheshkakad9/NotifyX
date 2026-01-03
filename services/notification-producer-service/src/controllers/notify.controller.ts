import { Request, Response } from "express";
import { notifyService } from "../services/notify.service.js";
import { success, error } from "../utils/response.js";

export const notifyController = {
    send: async (req: Request, res: Response) => {
        try {
            const { type, content,  priority } = req.body;
            const notif = await notifyService.sendNotification(req.user!.userId, type, content, priority || "low");
            success(res, "Notification queue", notif);
        } catch (err: any) {
            error(res,err.message);
        }
    }
};