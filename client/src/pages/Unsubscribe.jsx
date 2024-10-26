import { useState } from "react";
import axios from "axios";

const Unsubscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("/api/unsubscribe", {
        data: { email },
      });
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setMessage("Error unsubscribing. Please try again.");
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 p-8 rounded-lg shadow-lg text-white mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Unsubscribe from Daily Quotes
        </h1>
        <p className="text-center mb-4">
          "May the divine presence of Shri Radha guide you towards peace and
          joy."
        </p>
      </div>
      <form
        onSubmit={handleUnsubscribe}
        className="bg-gray-100 p-6 rounded shadow"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Unsubscribe
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Unsubscribe;
