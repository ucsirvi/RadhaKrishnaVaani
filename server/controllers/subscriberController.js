import Subscriber from "../models/Subscriber.js";
import validator from "validator";

const { isEmail } = validator;

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({ message: "Already subscribed." }); // Conflict
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();
    return res.status(201).json({ message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Error subscribing:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

export const unsubscribe = async (req, res) => {
  const { email } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const result = await Subscriber.deleteOne({ email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Email not found." });
    }
    return res.status(200).json({ message: "Successfully unsubscribed!" });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

export const checkSubscriptionStatus = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const subscriber = await Subscriber.findOne({ email });
    return res.status(200).json({ isSubscribed: !!subscriber });
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return res.status(500).json({
      message: "Error checking subscription status. Please try again later.",
    });
  }
};
