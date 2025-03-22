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

// router.post("/newTimer", validateSession, async (req, res) => {
//   try { 
//     if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }
//     const { SessionTitle, Break, MoodScale, } =
//       req.body;

//     const newTimer = new Timer({
//       SessionTitle: "SessionTitle",
//       Break: "Break",
//       MoodScale: "MoodScale"
    
//     });

//     await newTimer.save();
//     res.json({ message: "New Timer Created", newTimer: newTimer });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.post("/newTimer", validateSession, async (req, res) => {
  try {
    //handled in middleware

    const { SessionTitle, Break, MoodScale } = req.body;

    const newTimer = new Timer({
      SessionTitle: "SessionTitle", //has to have name dynamics
      Break: Break,
      MoodScale: MoodScale,
      userId: req.user.id,
    });

    await newTimer.save();
    res.json({ message: "New Timer Created", newTimer: newTimer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//GET TIMER
//Endpoint: localhost:3000/api/timer/getTimer
router.get("/getTimer", validateSession, async (req, res) => {
  
  res.json({ message: "Timer Settings", timerSettings });
});

//GET by ID
//Endpoint: localhost:3000/api/timer/getTimer/:id
router.get("/getTimer/:id", validateSession, (req, res) => {
  try {
    console.log(reg.params);
    
    let id = req.params.id;
    let individualTimer = timerSettings.find((timer) => timer.id == id);

    if (!individualTimer) {
      throw new Error("Timer not found");
    }

    res.json({ message: "success", individualTimer });
  } catch (error) {
    res.status(500).json({ message: "error", errormessage: error.massage });
  }
});

// PUT - by id update timer settings
// Endpoint localhost:3000/api/puttimer
router.put("/puttimer", validateSession, async (req, res) => {
  try {
    console.log(req.params);
    timerSettings = read();
    let id = req.params.id;
    const { sessionTimeEntry, breakTimeEntry, moodScale } = req.body;
    let index = timerSettings.findIndex((timer) => timer.id == id);

    timerSettings[index].sessionTimeEntry = sessionTimeEntry;
    timerSettings[index].breakTimeEntry = breakTimeEntry;
    timerSettings[index].moodScale = moodScale;
    save(timerSettings);
    res.json({
      message: "Timer Updated",
      UpdatetimerSettings: timerSettings[index],
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      errormessage: err.message,
    });
  }
});

// POST - Start/Stop timer
// Endpoint localhost:3000/api/add/timer/
router.post("add/timer/", validateSession, (req, res) => {
  try {
    const { SessionTitle, Break, MoodScale, } =
      req.body;
    let newPost = {
      SessionTitle: SessionTitle,
      Break: Break,
      MoodScale: MoodScale,
    };
    timerSettings.push(newPost);
    save(timerSettings);

    res.json({ message: "New Timer Created" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE - reset the timer
// Endpoint  localhost:3000/api/timer/reset
router.delete("/timer/reset", validateSession, (req, res) => {
  try {
    if (userTimers.has(req.user.id)) {
      const userTimer = userTimers.get(req.user.id);
      if (userTimer.intervalId) {
        clearInterval(userTimer.intervalId);
      }
    }

    userTimers.set(req.user.id, resetTimer);

    res.json(resetTimer); /* sent the reset timer settings back to the client */
  } catch (error) {
    console.log("Error in timer DELETE route:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
