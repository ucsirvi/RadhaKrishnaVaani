import { useState } from "react";
import linkedinLogo from "../assets/linkedinLogo.png";
import instagramLogo from "../assets/instagramLogo.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: "error", message: "All fields are required." });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-10 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 mb-4">
          We would love to hear from you! Share your thoughts, questions, or
          feedback.
        </p>
        {submitStatus && (
          <div
            className={`text-center mb-4 ${
              submitStatus.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-800 mb-1" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-1" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-1" htmlFor="message">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your Message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mt-6">
          Follow Us
        </h2>
        <p className="text-center text-gray-700">
          Stay connected with us on social media.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a
              href="https://www.linkedin.com/in/umesh-choudhary-7224a3222/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinLogo}
                alt="LinkedIn"
                className="h-8 w-8 transition duration-300 hover:scale-110"
              />
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagramLogo}
                alt="Instagram"
                className="h-8 w-8 transition duration-300 hover:scale-110"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
