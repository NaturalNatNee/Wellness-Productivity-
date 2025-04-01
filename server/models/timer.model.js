import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
  //  SessionTitle: { type: String, required: true },
  // Break: { type: String },
  // MoodScale: { type: Array, required: true },
   userId: { type: mongoose.Types.ObjectId, required: true },
  newRating:{type:String, require: true}
});

const Timer = mongoose.model('Timer', timerSchema);

export default Timer;
