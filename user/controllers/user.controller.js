import userModel from "../models/user.model.js";
import blacklistedtokenModel from "../models/blacklistedtoken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Emitter from "events";
import { subscribeToQueue } from "../../ride/service/rabbit.js";
const emitter = new Emitter();
export default class UserAuth {
    register = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (user)
                return res
                    .status(400)
                    .json({ ok: false, msg: "User already exists." });
            const hash = await bcrypt.hash(password, 10);
            const newUser = new userModel({ name, email, password: hash });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            res.cookie("token", token);
            return res.send({ ok: true, token, newUser });
        } catch (error) {
            res.status(500).json({ ok: false, msg: error.message });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email }).select("+password");
            if (!user)
                return res
                    .status(404)
                    .json({ ok: false, msg: "User not found." });
            const isPassCorrect = await bcrypt.compare(password, user.password);
            if (!isPassCorrect)
                return res
                    .status(400)
                    .json({ ok: false, msg: "Wrong Password." });
            delete user._doc.password;
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return res.cookie("token", token).json({ ok: true, token, user });
        } catch (error) {
            return res.status(500).json({ ok: false, msg: error.message });
        }
    };
    logout = async (req, res) => {
        try {
            const { token } = req.cookies;
            await blacklistedtokenModel.create({ token });
            res.clearCookie("token");
            return res.send({ ok: true, msg: "User logged out successfully" });
        } catch (error) {
            return res.status(500).json({ ok: false, msg: error.message });
        }
    };
    profile = async (req, res) => {
        try {
            return res.send(req.user);
        } catch (error) {
            res.json({ ok: false, msg: error.message });
        }
    };
    waitForRideAccept = async (req, res) => {
        try {
            setTimeout(() => {
                res.status(202).send();
            }, 30000);
            emitter.once("ride-accepted", (data) => {
                console.log("got data in one emitter", data);

                res.status(200).json({ ok: true, ride: data });
            });
        } catch (error) {
            return res.status(500).json({ ok: false, msg: error.message });
        }
    };
}
subscribeToQueue("ride-accepted", (data) => {
    data = JSON.parse(data);
    emitter.emit("ride-accepted", data);
    console.log("data emitted");
});
