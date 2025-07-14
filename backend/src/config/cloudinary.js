import { v2 as clouidnary } from 'cloudinary';
import { ENV } from './ENV.js';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
    clouidnary.config({
        cloud_name: ENV.CLOUDINARY_NAME,
        api_key: ENV.CLOUDINARY_API_KEY,
        api_secret: ENV.CLOUDINARY_API_SECRET
    })

    try {
        const uploadResult = await clouidnary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return uploadResult.secure_url;

    } catch (error) {
        console.log("Error in cloudinary : ", error);
        fs.unlinkSync(filePath);
        return null
    }
}

export default uploadOnCloudinary;