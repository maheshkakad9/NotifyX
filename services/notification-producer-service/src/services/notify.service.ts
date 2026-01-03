import { notifyRepo } from "../repositories/notify.repository.js";
import { publishPriorityMessage } from "../config/rabbitmq.js";

export const notifyService = {
    sendNotification: async (userId: string, type: string, content: string, priority="low") => {
        const job = { userId, type, content, priority };

        await publishPriorityMessage(job, priority as "high" | "low");

        return notifyRepo.create({ userId, type, content, status: "queued", priority });
    }
};