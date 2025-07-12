import express from 'express';
import connectDB from './config/db.js';
import { ENV } from './config/ENV.js';

const app = express();
const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening to port ${PORT}`);
});