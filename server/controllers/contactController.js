import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const handleContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\nMessage: ${message}`,
  };

  try {
    const contactMessage = new Contact({ name, email, message });
    await contactMessage.save();

    sendEmail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error handling contact message:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: " + error.message });
    } else if (error instanceof mongoose.Error) {
      return res
        .status(500)
        .json({ error: "Database error: " + error.message });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to send message. Please try again." });
    }
  }
};
