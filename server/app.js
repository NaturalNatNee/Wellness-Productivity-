import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "./controllers/authentication.controller.js";
import Timer from "./controllers/timer.controller.js";
import cors from "cors";

dotenv.config();

const app = express();





const PORT = process.env.PORT || 3000; // changed 5000 to 3000

mongoose
  .connect(process.env.MONGODB_URI) // Connecting to MongoDB throw the URI from the .env file
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  }); 




app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api/auth", auth);
app.use("/api/timer", Timer);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
