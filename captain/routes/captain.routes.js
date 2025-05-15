import { Router } from "express";
const router = Router();
import CaptainController from "../controllers/captain.controller.js";
import captainAuthMiddleware from "../middlewares/auth.middleware.js";
const captainController = new CaptainController();

router.post("/register", captainController.register);
router.post("/login", captainController.login);
router.get("/profile", captainAuthMiddleware, captainController.profile);
router.get("/logout", captainAuthMiddleware, captainController.logout);
router.patch(
    "/toggle-availability",
    captainAuthMiddleware,
    captainController.toggleAvailability
);
router.get(
    "/wait-for-ride",
    captainAuthMiddleware,
    captainController.waitForNewRide
);

export default router;
