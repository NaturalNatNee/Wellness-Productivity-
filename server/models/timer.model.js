import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
  //  SessionTitle: { type: String, required: true },
  // Break: { type: String },
  // MoodScale: { type: Array, required: true },
  //  userId: { type: mongoose.Types.ObjectId, required: false},
  createdAt: { type: Date, default: Date.now },
  newRating:{type:String, require: true}
});

const Timer = mongoose.model('Timer', timerSchema);

export default Timer;
