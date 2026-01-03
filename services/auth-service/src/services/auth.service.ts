import bcrypt from "bcryptjs";
import { userRepo } from "../repositories/user.repository.js";
import { generateTokens } from "../utils/token.js";

export const authService = {
    register: async (name: string, email: string, password: string) => {
        const exist = await userRepo.findByEmail(email);
        if (exist) throw new Error("Email already registered");

        const hashed = await bcrypt.hash(password, 10);
        const user = await userRepo.create({ name, email, password: hashed });

        return generateTokens(user._id.toString());
    },

    login: async (email: string, password: string) => {
        const user = await userRepo.findByEmail(email);
        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid credentials");

        return generateTokens(user._id.toString());
    },
};