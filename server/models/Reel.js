import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reel = mongoose.model("Reel", reelSchema);

export default Reel;
