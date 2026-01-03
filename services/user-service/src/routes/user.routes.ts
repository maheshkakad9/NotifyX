import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", authMiddleware, userController.profile);
router.put("/preferences", authMiddleware, userController.updatePreferences);

router.get("/validate", authMiddleware, (req, res) => {
    return res.status(200).json({
        valid: true,
        user: req.user
    });
});

export default router;