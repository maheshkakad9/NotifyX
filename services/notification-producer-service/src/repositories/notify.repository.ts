import { Notification } from "../models/notify.model.js";

export const notifyRepo = {
    create: (data: any) => Notification.create(data),
};

