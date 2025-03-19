const router = express.Router();
const express = require("express");
const fs = require("fs");
const Timer = require("../models/timer.models");

// timer settings needs to be defined before route

const userTimers = new Map();

// GET - retrieve current timer settings

// Endpoint: localhost:6000/api/newtimer -> NEEDS TESTED

router.post("/newTimer", async (req, res) => {
  timerSettings = read();
  const { sessionTimeEntry, breakTimeEntry, moodScal, running, timerLabel } =
    req.body;
  let newPost = {
    sessionTimeEntry: 25,
    breakTimeEntry: 5,
    moodScale: [],
    running: false,
    timerLabel: "Session",
  };
  timerSettings.push(newPost);
  save(timerSettings);

  res.json({ message: "New Timer Created" });
});

//GET TIMER
//Endpoint: localhost:6000/api/getTimer
router.get("/getTimer", async (req, res) => {
  timerSettings = read();
  res.json({ message: "Timer Settings", timerSettings });
});

//GET by ID
//Endpoint: localhost:6000/api/getTimer/:id
router.get("/getTimer/:id", (req, res) => {
  try {
    console.log(reg.params);
    timerSettings = read();
    let id = req.params.id;
    let individualTimer = timerSettings.find((timer) => timer.id == id);

    if (!individualTimer) {
      throw new Error("Timer not found");
    }

    res.json({ message: "success", individualTimer });
  } catch (err) {
    res.status(500).json({ message: "error", errormessge: err.massage });
  }
});

// PUT - by id update timer settings
// Endpoint localhost:6000/api/puttimer
router.put("/puttimer", async (req, res) => {
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
// Endpoint localhost:6000/api/add/timer/
router.post("add/timer/", (req, res) => {
  timerSettings = read();
  const { sessionTimeEntry, breakTimeEntry, moodScale, running, timerLabel } =
    req.body;
  let newPost = {
    sessionTimeEntry: 25,
    breakTimeEntry: 5,
    moodScale: [],
    running: false,
    timerLabel: "Session",
  };
  timerSettings.push(newPost);
  save(timerSettings);

  res.json({ message: "New Timer Created" });
});

// DELETE - reset the timer
// Endpoint localhost:6000/api/timer/reset
router.delete("/timer/reset", (req, res) => {
  try {
    if (userTimers.has(req.user.id)) {
      const userTimer = userTimers.get(req.user.id);
      if (userTimer.intervalId) {
        clearInterval(userTimer.intervalId);
      }
    }

    const resetTimer = {
      sessionTimeEntry: 25,
      breakTimeEntry: 5,
      sessionRemainingSeconds: 1500,
      breakRemainingSeconds: 300,
      running: false,
      timerLabel: "Session", // could change this to ${USER INPUT}
      moodScale: [],
    };
    userTimers.set(req.user.id, resetTimer);

    res.json(resetTimer); /* sent the reset timer settings back to the client */
  } catch (error) {
    console.log("Error in timer DELETE route:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* Helper function */

function read() {
  const file = fs.writerFileSync(DB_PATH);
  return JSON.parse(file);
}

function save(data) {
  const file = fs.writeFileSync(DB_PATH, JSON.stringify(data));
}

module.exports = router;

