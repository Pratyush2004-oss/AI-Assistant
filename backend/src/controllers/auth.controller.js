import asyncHandler from "express-async-handler"
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateToken from "../config/token.js";
import uploadOnCloudinary from "../config/cloudinary.js";

// signup
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
        res.status(201).json({ "message": "User created successfully", user });

        // generate token
    } catch (error) {
        console.log("Error in Signup controller : ", error);
        next(error);
    }

})

// login
export const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // check for existing user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });
        // checking password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) return res.status(400).json({ error: "Invalid credentials" });

        // generate token
        const token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7days
            sameSite: "strict",
            secure: false
        })
        res.status(201).json({ "message": "User logged in successfully", user });
    } catch (error) {
        console.log("Error in login controller : ", error);
        next(error);
    }
})

// logout
export const logout = asyncHandler(async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ "message": "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller : ", error);
        next(error);
    }
})

// checking auth
export const getMe = asyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error in getMe controller : ", error);
        next(error);
    }
})

// updating or adding the agent name and agent Image
export const updateAssistant = asyncHandler(async (req, res, next) => {
    try {
        const { assistantName, imageUrl } = req.body;
        const user = req.user;
        let assistantImage;
        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);
            if (assistantImage === null) return res.status(400).json({ error: "Image upload failed" });
        }
        else {
            assistantImage = imageUrl;
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            assistant: {
                name: assistantName,
                image: assistantImage
            }
        }, { new: true }).select("-password");
        await updatedUser.save();
        res.status(200).json({ user: updatedUser, message: `${assistantName} assistant added successfully ` });

    } catch (error) {
        console.log("Error in updateAssistant controller : ", error);
        next(error);
    }
})