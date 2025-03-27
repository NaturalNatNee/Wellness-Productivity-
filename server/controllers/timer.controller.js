import { Router } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import validateSession from "../middleware/validate-session.js";
import Timer from "../models/timer.model.js";
// timer settings needs to be defined before route

dotenv.config();

const router = Router();

// GET - retrieve current timer settings

// Endpoint: localhost:3000/api/newTimer -> NEEDS TESTED
router.post("/newTimer", validateSession, async (req, res) => {
  try {
    //handled in middleware

    const { SessionTitle, Break, MoodScale } = req.body;
  try {
    /* 
    if (!token){
      return res.status(401).json({ error: "No token provided." });
    } */
    const { SessionTitle, Break, MoodScale } = req.body;

    const newTimer = new Timer({
      SessionTitle: "SessionTitle", //has to have name dynamics
      Break: Break,
      MoodScale: MoodScale,
      userId: req.user.id,
      userId: req.user.id,
    });
    await newTimer.save();
    res.json({ message: "New Timer Created", newTimer: newTimer });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

//GET TIMER
//Endpoint: localhost:3000/api/timer/getTimer
router.get("/getTimer", validateSession, async (req, res) => {
  try {
    const userTimers = await Timer.find({ userId: req.user.id });
    res.json({ timers: userTimers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});


export default router;
