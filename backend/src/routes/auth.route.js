import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import isAuth from "../middleware/auth.middleware.js";

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/getMe",isAuth, getMe);

export default authRouter;