import { Router } from "express";
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
    const { SessionTitle, Break, MoodScale } = req.body;

    const newTimer = new Timer({
      SessionTitle, // Dynamically set from the request body
      Break,
      MoodScale,
      userId: req.user.id, // Retrieved from the validated token in middleware
    });

    await newTimer.save();
    res.json({ message: "New Timer Created", newTimer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//   http://localhost:3000/api/timer/newRating
router.post("/newRating", validateSession, async (req, res) => {
  try {
    const { newRating } = req.body;
    const Rating = new Timer({
      newRating: newRating,
      userId: req.user.id,
    });

    await Rating.save();
    res.json({ userId: req.user._id, message: "New Rating Created", Rating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// * View all Rating in a timer
//http://localhost:3000/api/timer/viewRating

router.get("/viewRating", validateSession, async (req, res) => {
  try {   
     const userId = req.user.id || req.user._id; // Handle both formats
    const Ratings = await Timer.find({userId});

    res.json({
      message: "success from get",
      Ratings: Ratings,
      userId: req.userId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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
