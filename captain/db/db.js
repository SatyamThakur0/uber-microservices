import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// console.log(process.env.MONGO_URI);

function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Captain service connected to mongoDB...");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;
