import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import imageRoutes from "./routes/imageRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import reelRoutes from "./routes/reelRoutes.js";
import cloudinary from "cloudinary";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import nodemailer from "nodemailer";
import Subscriber from "./models/Subscriber.js";
import Quote from "./models/Quote.js";
import cron from "node-cron";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

cloudinary.v2.config({
  cloud_name: process.env.Cloudname,
  api_key: process.env.APIkey,
  api_secret: process.env.APIsecret,
});

app.use("/api/images", imageRoutes);
app.use("/api", chapterRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api", subscriberRoutes);
app.use("/api/contact", contactRoutes);

const sendQuoteToSubscribers = async () => {
  try {
    const subscribers = await Subscriber.find({});
    const gitaQuotes = await Quote.find({});

    if (gitaQuotes.length === 0) {
      console.log("No quotes available.");
      return;
    }
    if (subscribers.length === 0) {
      console.log("No subscribers to send quotes to.");
      return;
    }

    const randomQuote =
      gitaQuotes[Math.floor(Math.random() * gitaQuotes.length)];
    console.log("Selected Quote:", randomQuote.text);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const subscriber of subscribers) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: "Bhagavad Gita Quote of the Day",
        text: `Quote of the Day:\n\n${randomQuote.text}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Quote sent to: ${subscriber.email}`);
      } catch (mailError) {
        console.error(`Error sending email to ${subscriber.email}:`, mailError);
      }
    }
    console.log("Quotes sent to all subscribers!");
  } catch (error) {
    console.error("Error sending quotes:", error);
  }
};

cron.schedule("0 7 * * *", sendQuoteToSubscribers);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
