// routes/routes.js
const express = require("express");
const loggingController = require("../controllers/logging.controller");

const router = express.Router();

// Route to start a new session
router.post("/start", loggingController.startSession); // http://localhost:3000/api/start

// Route to get all sessions
router.get("/", loggingController.getAllSessions); // http://localhost:3000/api

// Route to get a session by ID
router.get("/:id", loggingController.getSessionById); // http://localhost:3000/api/:id

// Route to end a session by MongoDB _id
router.post("/end_session/:id", loggingController.endSession); // http://localhost:3000/api/end_session/:id

module.exports = router;
