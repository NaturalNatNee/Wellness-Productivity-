// controllers/logging.controller.js
const moment = require("moment");
const Session = require("../models/logging.model");

// Start a new session
const startSession = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const startTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    const startTime = Date.now(); // Capture current time in milliseconds

    const newSession = new Session({
      user_id,
      startTimestamp,
      startTime, // Store actual start time in milliseconds
    });

    await newSession.save();
    res.status(201).json({
      message: `Session started for user ${user_id}`,
      sessionId: newSession._id, // Include the session's _id in the response
      startTimestamp,
    });
  } catch (error) {
    res.status(500).json({ message: "Error starting session", error });
  }
};

// Get all sessions
const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions", error });
  }
};

// Get a session by ID
const getSessionById = async (req, res) => {
  try {
    const { id } = req.params; // Get session _id from route parameter

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Error fetching session", error });
  }
};

// End a session by MongoDB _id
const endSession = async (req, res) => {
  try {
    const { id } = req.params; // Get session _id from route parameter

    if (!id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // If session is already ended
    if (session.endTimestamp) {
      return res.status(400).json({ message: "Session already ended" });
    }

    const endTime = Date.now();

    // Ensure that startTime is valid
    if (typeof session.startTime !== "number" || isNaN(session.startTime)) {
      return res.status(400).json({ message: "Invalid start time for this session" });
    }

    const sessionDuration = (endTime - session.startTime) / 1000; // Duration in seconds
    const endTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    session.endTimestamp = endTimestamp;
    session.sessionDuration = sessionDuration;

    await session.save();

    res.status(200).json({
      message: `Session ended for session id ${id}`,
      sessionDuration,
      startTimestamp: session.startTimestamp,
      endTimestamp,
    });
  } catch (error) {
    res.status(500).json({ message: "Error ending session", error });
  }
};

module.exports = {
  startSession,
  getAllSessions,
  getSessionById,
  endSession,
};
