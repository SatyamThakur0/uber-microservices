import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            (req.headers.authorization &&
                req.headers.authorization.split(" ")[1]);

        if (!token) return res.send({ ok: false, msg: "Unauthorized." });
        let response = await fetch(`${process.env.BASE_URL}/user/profile`, {
            headers: {
                Authorization: `bearer ${token}`,
            },
        });
        response = await response.json();
        req.user = response;
        next();
    } catch (error) {
        return res.send({ ok: false, msg: error.message });
    }
};

export const captainAuth = async (req, res, next) => {
    try {
        const token =
            // req.cookies.token ||
            (req.headers.authorization &&
                req.headers.authorization.split(" ")[1]);
        console.log(token);

        // if (!token) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res
                .status(401)
                .json({ ok: false, msg: " decode Unauthorized" });
        }
        let response = await fetch(`${process.env.BASE_URL}/captain/profile`, {
            method: "get",
            headers: {
                Authorization: `bearer ${token}`,
            },
        });
        response = await response.json();
        console.log("res : ", response);

        const captain = response;

        if (!captain) {
            return res.status(401).json({ message: " capt Unauthorized" });
        }

        req.captain = captain;

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
