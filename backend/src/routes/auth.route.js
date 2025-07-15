import express from "express";
import { getMe, login, logout, signup, updateAssistant } from "../controllers/auth.controller.js";
import isAuth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/getMe", isAuth, getMe);
authRouter.post("/updateAssistant", isAuth, upload.single("assistantImage"), updateAssistant)

export default authRouter;