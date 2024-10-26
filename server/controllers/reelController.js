import Reel from "../models/Reel.js";

export const getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find();
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reels", error });
  }
};
