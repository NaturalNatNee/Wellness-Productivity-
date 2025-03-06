const express = require('express');
const router = express.Router();

// GET - retrieve current timer settings
router.get('/timer', (req, res) => {
   res.json(timerSettings);
});

// PUT - update timer settings
router.put('/timer', (req, res) => {
    const { sessionTimeEntry, breakTimeEntry, moodScale } = req.body;

    if (sessionTimeEntry) {
        timerSettings.sessionTime = sessionTimeEntry;
        timerSettings.sessionRemaining = sessionTimeEntry * 60;
    }

    if (breakTimeEntry) {
        timerSettings.breakTimeEntry = breakTimeEntry;
        timerSettings.breakRemaining = breakTimeEntry * 60;
    }
    res.json(timerSettings);
});

// POST - Start/Stop timer
router.post('/timer/startstop', (req, res) => {
    timerSettings.running =!timerSettings.running;
    res.json({ running: timerSettings.running });
});

// DELETE - reset the timer
router.delete('/timer/reset', (req, res) => {
    timerSettings ={
        sessionTimeEntry: 25,
        breakTimeEntry: 5,
        sessionRemainingSeconds: 1500,
        breakRemainingSeconds: 300,
        running: false,
        timerLable: "Session", // could change this to ${USER INPUT}
    };
    res.json(timerSettings);
});

module.exports = router;