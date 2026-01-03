import { redis } from "../config/redis.js";
import { userRepo } from "../repositories/user.repository.js";

export const userService = {
    getProfile: async (userId: string) => {
        const cacheKey = `user:${userId}`;

        const cached = await redis.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const user = await userRepo.getById(userId);
        if(!user) throw new Error("User not found");

        await redis.set(cacheKey, JSON.stringify(user), "EX", Number(process.env.CACHE_EXPIRY));
        return user;
    },

    updatePreferences: async (userId: string, data: any) => {
        const user = await userRepo.updatePreferences(userId, data);

        await redis.del(`user:${userId}`);
        return user;
    }
};