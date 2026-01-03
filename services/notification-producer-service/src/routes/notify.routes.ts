import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { notifyController } from "../controllers/notify.controller.js";
import { rateLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/send", authMiddleware, rateLimiter, notifyController.send);

export default router;