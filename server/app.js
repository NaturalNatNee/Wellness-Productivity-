import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import router from "./controllers/authentication.controller.js";
const auth = require('./controllers/authentication.controller');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

//ROUTES
app.use('/api/auth', auth);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

