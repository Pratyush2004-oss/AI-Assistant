import dotenv from "dotenv";
dotenv.config();
export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_URL: process.env.GEMINI_URL
}