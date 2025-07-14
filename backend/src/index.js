import express from 'express';
import connectDB from './config/db.js';
import { ENV } from './config/ENV.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// importing routers 
import authRouter from './routes/auth.route.js';

const app = express();
const PORT = ENV.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Server is running");
})
app.use("/api/v1/auth", authRouter);        // user routes


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening to port ${PORT}`);
});