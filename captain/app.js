import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import captainRoutes from "./routes/captain.routes.js";
import connect from "./db/db.js";
dotenv.config();
export const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/captain", captainRoutes);
