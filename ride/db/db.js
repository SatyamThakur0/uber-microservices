import mongoose from "mongoose";

const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("Ride service connected to mongoDB..."))
        .catch((err) => console.log(err.message));
};
export default connect;
