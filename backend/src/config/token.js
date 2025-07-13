import jwt from "jsonwebtoken";
import { ENV } from "./ENV.js";

const generateToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, ENV.JWT_SECRET, {
            expiresIn: "30d",
        });
        return token
    } catch (error) {
        console.log("Error in generating token : ", error);
        return null
    }
}

export default generateToken