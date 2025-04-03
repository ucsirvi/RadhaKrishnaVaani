import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/2.jpg";
import radhaKrishna from "../assets/radhakrishna.png";
import GitaBot from "../pages/GitaBot.jsx";
import SubscriptionForm from "../pages/SubscriptionForm";
import Unsubscribe from "../pages/Unsubscribe";
import axios from "axios";


const Home = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkSubscriptionStatus = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/check-subscription`);
      setIsSubscribed(response.data.isSubscribed);
    } catch (error) {
      console.error("Error checking subscription status:", error.message);
      setError("Failed to check subscription status. Please try again later.");
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);



  return (
    <div>
      <section className="relative h-[70vh] text-white overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: "brightness(1.2)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto h-full flex flex-col justify-center items-center relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
            Welcome to RadhaKrishna Vaani
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8">
            Dive deep into the divine teachings of Shri Krishna and explore the
            spiritual wisdom of the Bhagavad Gita.
          </p>
          <Link
            to="/chapters"
            className="bg-gradient-to-r from-pink-600 to-yellow-400 px-6 py-3 rounded-full text-lg md:text-xl font-semibold shadow-lg hover:shadow-2xl transition duration-300"
          >
            Explore Chapters
          </Link>
        </div>
      </section>

      {isSubscribed ? (
          <Unsubscribe setIsSubscribed={setIsSubscribed} />
        ) : (
          <SubscriptionForm setIsSubscribed={setIsSubscribed} />
        )}

      <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-8">
            The Eternal Love of Radha and Krishna
          </h2>
          <p className="text-lg mb-8">
            Shree Radha, the symbol of pure devotion, and Shri Krishna, the
            epitome of divine love, together embody the most profound form of
            spiritual connection. Their relationship transcends the material
            world and speaks of eternal, unconditional love and devotion.
          </p>
          <img
            src={radhaKrishna}
            alt="Radha Krishna"
            className="mx-auto rounded-lg shadow-lg mb-8 max-w-full md:max-w-md"
          />
          <p className="text-lg mb-8">
            Explore the deeper meanings of Shree Radha's unconditional devotion
            and the significance of her presence in Shri Krishna’s life. Their
            divine union reflects the perfect harmony between the soul (Radha)
            and the supreme (Krishna).
          </p>
        </div>
      </section>
        <GitaBot />
      
    </div>
  );
};

export default Home;
