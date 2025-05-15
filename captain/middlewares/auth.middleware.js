import jwt from "jsonwebtoken";
import blacklistedtokenModel from "../models/blacklistedtoken.model.js";
import captainModel from "../models/captain.model.js";

export const captainAuthMiddleware = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            (req.headers.authorization &&
                req.headers.authorization.split(" ")[1]);
        if (!token)
            return res.status(401).json({ ok: false, msg: "Unauthorized" });
        const blacklistToken = await blacklistedtokenModel.find({ token });
        if (blacklistToken.length)
            return res.status(401).json({ ok: false, msg: "Unauthorized" });
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res
                .status(401)
                .json({ ok: false, msg: "Invalid or expired token" });
        }
        const captain = await captainModel.findById(decoded.id);
        if (!captain)
            return res.status(401).json({ ok: false, msg: "Unauthorized" });
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(500).json({ ok: false, msg: error.message });
    }
};
export default captainAuthMiddleware;
