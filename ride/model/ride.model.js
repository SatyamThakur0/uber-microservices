import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    captain: {
        type: mongoose.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["accepted", "requested", "started"],
        default: "requested",
    },
});

const rideModel = mongoose.model("ride", rideSchema);
export default rideModel;
