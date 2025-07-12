import asyncHandler from "express-async-handler"
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exist" });

        // checking password length
        if (password.length < 6) {
            return res.status(400).json({ "error": "Password should be less than 6 characters.." })
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // saving the data to the database
        const user = await User.create({
            email,
            name,
            password: hashedPassword
        })
    } catch (error) {
        console.log("Error in Signup controller : ", error);
        next(error);
    }

})