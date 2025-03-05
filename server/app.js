import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

//ROUTES
app.use('/api/auth', require ('./routes/auth'));