import { Router } from "express";
const router = Router();
import CaptainController from "../controllers/captain.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const captainController = new CaptainController();

router.post("/register", captainController.register);
router.post("/login", captainController.login);
router.get("/profile", authMiddleware, captainController.profile);
router.get("/logout", authMiddleware, captainController.logout);
router.patch("/toggle-availability", authMiddleware, captainController.toggleAvailability);

export default router;
