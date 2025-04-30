import captainModel from "../models/captain.model.js";
import blacklistedtokenModel from "../models/blacklistedtoken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class CaptainAuth {
  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const captain = await captainModel.findOne({ email });
      if (captain)
        return res
          .status(400)
          .json({ ok: false, msg: "captain already exists." });
      const hash = await bcrypt.hash(password, 10);
      const newcaptain = new captainModel({ name, email, password: hash });
      await newcaptain.save();
      const token = jwt.sign({ id: newcaptain._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token);
      return res.send({ ok: true, token, captain:newcaptain });
    } catch (error) {
      res.status(500).json({ ok: false, msg: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const captain = await captainModel.findOne({ email }).select("+password");
      if (!captain)
        return res.status(404).json({ ok: false, msg: "captain not found." });
      const isPassCorrect = await bcrypt.compare(password, captain.password);
      if (!isPassCorrect)
        return res.status(400).json({ ok: false, msg: "Wrong Password." });
      delete captain._doc.password;
      const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.cookie("token", token).json({ ok: true, token, captain });
    } catch (error) {
      return res.status(500).json({ ok: false, msg: error.message });
    }
  };
  logout = async (req, res) => {
    try {
      const { token } = req.cookies;
      await blacklistedtokenModel.create({ token });
      res.clearCookie("token");
      return res.send({ ok: true, msg: "Captain logged out successfully" });
    } catch (error) {
      return res.status(500).json({ ok: false, msg: error.message });
    }
  };
  profile = async (req, res) => {
    try {
      res.send(req.captain);
    } catch (error) {
      res.json({ ok: false, msg: error.message });
    }
  };
  toggleAvailability = async (req, res) => {
    try {
      const captain = await captainModel.findById(req.captain.id);
      captain.isAvailable = !captain.isAvailable;
      await captain.save();
      return res.status(200).json({ ok: true, captain });
    } catch (error) {
      return res.status(500).json({ ok: false, msg: error.message });
    }
  };
}
