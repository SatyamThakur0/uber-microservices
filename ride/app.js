import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rideRoutes from "./routes/ride.routes.js";
import { connectToRabbitMQ } from "./service/rabbit.js";
import connectDB from "./db/db.js";
dotenv.config();
export const app = express();
connectDB();

connectToRabbitMQ();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/ride", rideRoutes);
