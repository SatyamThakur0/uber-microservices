import rideModel from "../model/ride.model.js";
import { publishToQueue } from "../service/rabbit.js";

export default class RideController {
    createRide = async (req, res) => {
        try {
            const { source, destination } = req.body;
            const newRide = new rideModel({
                user: req.user,
                source,
                destination,
            });
            await newRide.save();
            publishToQueue("new-ride", JSON.stringify(newRide));
            return res.json({ ok: true, newRide });
        } catch (error) {
            return res.status(500).json({ ok: false, msg: error.message });
        }
    };
    acceptRide = async (req, res) => {
        try {
            const { rideId } = req.query;
            if (!rideId)
                return res
                    .status(400)
                    .json({ ok: false, msg: "Missing Data." });
            const ride = await rideModel.findById(rideId);
            if (!ride)
                return res
                    .status(400)
                    .json({ ok: false, msg: "Ride not found" });
            ride.status = "accepted";
            ride.captain = req.captain._id;
            await ride.save();
            publishToQueue("ride-accepted", ride);
            return res.status(200).json({ ok: true, ride });
        } catch (error) {
            return res.status(500).json({ ok: false, msg: error.message });
        }
    };
}
