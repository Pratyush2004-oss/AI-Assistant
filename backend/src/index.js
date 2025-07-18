import express from 'express';
import connectDB from './config/db.js';
import { ENV } from './config/ENV.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// importing routers 
import authRouter from './routes/auth.route.js';
import geminiResponse from './config/gemini.js';

const app = express();
const PORT = ENV.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));


app.use("/api/v1/auth", authRouter);        // user routes

app.use((err, req, res, next) => {
    res.status(500).json({ "error": err.message });
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening to port ${PORT}`);
});