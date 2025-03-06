const express = require("express");
const router = express.Router();

// timer settings needs to be defined before route
let timerSettings = {
  sessionTimeEntry: 25,
  breakTimeEntry: 5,
  sessionRemainingSeconds: 1500,
  breakRemainingSeconds: 300,
  running: false,
  timerLabel: "Session",
};

// GET - retrieve current timer settings
// Endpoint: localhost:6000/api/timer -> NEEDS TESTED
router.get("/timer", (req, res) => {
  try {
    res.json(timerSettings);
  } catch (error) {
    console.error("Error in timer GET route:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT - update timer settings
// Endpoint localhost:6000/api/timer
router.put("/timer", (req, res) => {
  try {
    const { sessionTimeEntry, breakTimeEntry, moodScale } = req.body;

    if (sessionTimeEntry) {
      // THIS IS WHERE WHAT IS LOGGED -> session length, breaks, mood...
      timerSettings.sessionTime = sessionTimeEntry;
      timerSettings.sessionRemaining = sessionTimeEntry * 60;
    }

    if (breakTimeEntry) {
      timerSettings.breakTimeEntry = breakTimeEntry;
      timerSettings.breakRemaining = breakTimeEntry * 60;
    }
    if (moodScale) {
      timerSettings.moodScale = moodScale;
    }
    res.json(timerSettings);
  } catch (error) {
    console.error("Error in timer PUT route:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST - Start/Stop timer
// Endpoint localhost:6000/api/timer/startstop
router.post("/timer/startstop", (req, res) => {
  try {
    timerSettings.running = !timerSettings.running;
    res.json({ running: timerSettings.running });
  } catch (error) {
    console.log("Error in timer POST route:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE - reset the timer
// Endpoint localhost:6000/api/timer/reset
router.delete("/timer/reset", (req, res) => {
    try{
  timerSettings = {
    sessionTimeEntry: 25,
    breakTimeEntry: 5,
    sessionRemainingSeconds: 1500,
    breakRemainingSeconds: 300,
    running: false,
    timerLabel: "Session", // could change this to ${USER INPUT}
  };
  res.json(timerSettings);
} catch (error) {
    console.log("Error in timer DELETE route:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
