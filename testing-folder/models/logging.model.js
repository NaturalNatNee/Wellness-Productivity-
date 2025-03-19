// models/logging.model.js
const mongoose = require("mongoose");

const loggingSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    startTimestamp: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTimestamp: {
      type: String,
      default: null,
    },
    sessionDuration: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", loggingSchema);

module.exports = Session;
