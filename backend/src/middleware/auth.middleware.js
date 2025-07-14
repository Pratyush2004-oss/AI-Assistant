import jwt from "jsonwebtoken";
import { ENV } from "../config/ENV.js";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization;
        if (!token) return res.status(401).json({ "error": "Unauthorized - no token found" });

        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        if (!decodedToken) return res.status(401).json({ "error": "Unauthorized - invalid token" });

        const user = await User.findById(decodedToken.userId).select("-password");
        if (!user) return res.status(401).json({ "error": "Unauthorized - user not found" });
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in isAuth middleware : ", error);
        next(error);
    }
}

export default isAuth;