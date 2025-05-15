import Router from "express";
const router = Router();
import { userAuth, captainAuth } from "../middleware/userAuth.js";
import RideController from "../controllers/ride.controller.js";
const rideController = new RideController();

router.post("/create-ride", userAuth, rideController.createRide);
router.get("/accept-ride", captainAuth, rideController.acceptRide);

export default router;
