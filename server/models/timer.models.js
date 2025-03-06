const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  SessionTitle: { type: String, required: true },
  Break: { type: String },
  MoodScale: { type: Array, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('timer', timerSchema);
