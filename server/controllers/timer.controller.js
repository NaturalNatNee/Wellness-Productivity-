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

const userTimers = new Map();

// GET - retrieve current timer settings
// Endpoint: localhost:6000/api/timer -> NEEDS TESTED

router.get("/timer", (req,res) => {
    /* check if user already has a timer settings stored in memory */
    if (userTimers.has(req.user.id));/*  if yes return those specific settings */
 
else {
    res.json(timerSettings); /* if not return the default timer settings */
}
}); /* Using UserID that is from their login ID */


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

    let userTimer = userTimers.has(
      req.user.id
    ) /* gets users current timer settings or creates new ones if they dont exist  */
      ? userTimers.get(req.user.id) /* checks if usertimers has a user.id */
      : { ...timerSettings }; /* this creates a copy of the default settings */

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

    userTimer.set(
      req.user.id,
      userTimer
    ); /* stores updated timer settings in memory, this allows users to have different timer settings */
 saveTimerToDatabase(req.user.id,  userTimer); 

    res.json(timerSettings); /* sends the updated timer settings back to the client as a response */
  } catch (error) /* log any errors that occurs */ {
    console.error("Error in timer PUT route:", error);
    res.status(500).json({ message: "Server Error" }); /* sends a 500 status code with error message */
  }
});

// POST - Start/Stop timer
// Endpoint localhost:6000/api/timer/startstop
router.post("/timer/startstop", (req, res) => {

 
 let userTimer = userTimers.has(req.user.id)
 ? userTimers.get(req.user.id)
 : {...timerSettings};

 userTimer.running = !userTimer.running; /* toggles the running state */

 /*  if the timer is now running we need to set up countdown */
 if (userTimer.running) {
  /* if there is an internval running clear it to prevent mutiple timers */
   if (userTimer.intervalId) {
    clearInterval(userTimer.intervalId);
   }
 }
/*  setting up a new interval that runs every 1000ms (1sec)
 this is what makes the timer countdown */

 const intervalId = setInterval(() => {
    /* getting the current timer state from memory 
    doing this inside the interval to make sure we have the latest state */
    const currentTimer = userTimers.get(req.user.id);

/*     if the timer does not exist or isnt running anymore stop the interval 
 */    if (!currentTimer || !currentTimer.running) {
        clearInterval(intervalId);
        return;
    }

   /*  handle timer base on current label  */
    if (currentTimer.timerLabel === "Session") {
        if (currentTimer.sessionRemainingSeconds > 0) {
           /*  this decrease reamining time by 1 second */
           currentTimer.sessionRemainingSeconds -= 1;
        }
        else if (currentTimer.breakRemainingSeconds >0 ) {
            /* if session is done we have the break time , switch to break */
            currentTimer.timerLabel = "Break";
        }
        else if (currentTimer.timerLabel === "Break") {
          /*   if we are in a break and there is a timer remaining  */
          if (currentTimer.breakRemainingSeconds > 0){
            currentTimer.breakRemainingSeconds -=1;
          }
          else {
            currentTimer.sessionRemainingSeconds = currentTimer.sessionTimeEntry * 60
            currentTimer.breakRemainingSeconds = currentTimer.breakTimeEntry * 60
            currentTimer.timerLabel = "Session";
          }
        }
       /*  update the timer in memoery with the new state */
       userTimers.set(req.user.id, currentTimer);
        userTimer.intervalId = intervalId;
  /*   1000);  */
   
 } else {
    /*  if we are stopping the imter clear the interval  */
    if (userTimer.intervalId) {
        clearInterval(userTimer.intervalId);
        userTimer.intervalId = null; /* set to null to indicate no active internval  */
    }
 }
 userTimers.set(req.user.id, userTimer);




  try {
    timerSettings.running = !timerSettings.running;
    res.json({ running: userTimers.running });
  } catch (error) {
    console.log("Error in timer POST route:", error); /* Logs in any errors that occur */
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE - reset the timer
// Endpoint localhost:6000/api/timer/reset
router.delete("/timer/reset", (req, res) => {
    try{

        if (userTimers.has(req.user.id)) {
            const userTimer = userTimers.get(req.user.id);
            if (userTimer.intervalId ){
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
    moodScale: []
  };
  userTimers.set(req.user.id,resetTimer);

  res.json(resetTimer); /* sent the reset timer settings back to the client */
} catch (error) {
    console.log("Error in timer DELETE route:", error);
    res.status(500).json({ message: "Server Error" });
  }
 
});

/* Helper function */

async function saveTimerToDatabase(userId,userTimer) {
    try {
        let timer = await Timer.findOne({ userId});
        if (timer) {
            timer.sessionTtile = userTimer.sessionTimeEntry.toString();
            timer.Break = userTimer.breakTimeEntry.toString();
           /*  only updates mood scale if it exist in the user timer */
           if (userTimer.moodScale) {
            timer.moodScale = userTimer.moodScale;
           }
         /*   save the changes to the database */
         await timer.save();
        
        } else {
            const newTimer = new Timer ({
                SessionTtile: userTimer.sessionTimeEntry.toString(),
                Break: userTimer.breakTimeEntry.toString(),
                moodScale: userTimer.moodScale || [],
                userId /* this assciates the timer with the specific user */
            });
            await newTimer.save();
        }
    } catch (error {
        console.error("Error saving timer to database:", error);
    }
)
    
}
 module.exports = router