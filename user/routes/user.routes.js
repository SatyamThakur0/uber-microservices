import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.profile);
router.get("/logout", authMiddleware, userController.logout);
router.post("/logout", authMiddleware, userController.logout);
router.get("/wait-for-ride-accept", authMiddleware, userController.waitForRideAccept);

export default router;
