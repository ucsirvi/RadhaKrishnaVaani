import { useState, useEffect } from "react";
import axios from "axios";

const SubscriptionForm = ({ setIsSubscribed }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  const checkIfSubscribed = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://radhakrishnavaani-server.onrender.com/api/check-subscription", {
        params: { email },
      });

      if (response.status === 200 && response.data.isSubscribed) {
        setIsAlreadySubscribed(true);
        setMessage("You are already subscribed.");
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error checking subscription:", error.message || error);
      setMessage("Error checking subscription status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      checkIfSubscribed();
    }
  }, [email]);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setMessage("Please fill out both fields.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("https://radhakrishnavaani-server.onrender.com/api/subscribe", {
        name,
        email,
      });

      if (response.status === 201) {
        setMessage(
          "Thank you for subscribing! Check your inbox for tomorrow's Shloka."
        );
        setIsSubscribed(true);
        setEmail("");
        setName("");
      } else if (response.status === 409) {
        setMessage("You are already subscribed.");
      }
    } catch (error) {
      setMessage("Error subscribing. Please try again.");
      console.error("Subscription error:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-green-500 via-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Quote of the Day
        </h2>
        <p className="text-lg mb-4">
          Get a daily quote from the Bhagavad Gita delivered to your inbox each
          morning.
        </p>

        {isAlreadySubscribed ? (
          <p className="text-lg text-green-200">{message}</p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg text-gray-800"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-left text-gray-700 font-medium mb-2"
              >
                Enter your name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-left text-gray-700 font-medium mb-2"
              >
                Enter your email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your email"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-yellow-400 w-full py-2 rounded-lg text-lg text-white font-semibold shadow-lg hover:shadow-2xl transition duration-300"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {message && !isAlreadySubscribed && (
          <p className="mt-4 text-lg">{message}</p>
        )}
      </div>
    </section>
  );
};

export default SubscriptionForm;
