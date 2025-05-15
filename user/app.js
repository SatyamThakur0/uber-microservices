import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import connectToDB from "./db/db.js";
import { connectToRabbitMQ } from "./service/rabbit.js";
dotenv.config();
export const app = express();
connectToDB();
connectToRabbitMQ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", userRoutes);
