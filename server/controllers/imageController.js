import Image from "../models/Image.js";

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    return res.status(200).json(images);
  } catch (error) {
    console.error("Error retrieving images:", error);
    return res.status(500).json({ message: "Failed to retrieve images." });
  }
};

export { getAllImages };
