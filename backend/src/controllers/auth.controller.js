import asyncHandler from "express-async-handler"
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateToken from "../config/token.js";

export const signup = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exist" });

        // checking password length
        if (password.length < 6) {
            return res.status(400).json({ "error": "Password must be atleast 6 characters.." })
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // saving the data to the database
        const user = await User.create({
            email,
            name,
            password: hashedPassword
        })
        const token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7days
            sameSite: "strict",
            secure: false
        })
        res.status(201).json({ "message": "User created successfully", token, user });

        // generate token
    } catch (error) {
        console.log("Error in Signup controller : ", error);
        next(error);
    }

})