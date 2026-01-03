import { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis.js";

const LIMIT = 5;
const EXPIRE = 60;

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized"});

    const key = `rate:${userId}`;

    const requests = await redis.incr(key);

    if (requests === 1) {
        await redis.expire(key, EXPIRE);
    }

    if (requests > LIMIT) {
        const ttl = await redis.ttl(key);
        return res.status(429).json({
            success: false,
            message: `Rate limit exceeded. Try again after ${ttl} seconds`
        });
    }

    next();
};