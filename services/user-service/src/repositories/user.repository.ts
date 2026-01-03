import { User } from "../models/user.model.js";

export const userRepo = {
    getById: (id: string) => User.findById(id),
    updatePreferences: (id: string, data: any) => 
        User.findByIdAndUpdate(id, { preferences: data }, { new: true }),
};

