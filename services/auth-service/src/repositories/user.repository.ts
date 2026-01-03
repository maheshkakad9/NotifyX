import { User } from "../models/user.model.js";

export const userRepo = {
    findByEmail: (email: string) => User.findOne({ email }),
    create: (data: any) => User.create(data),
};