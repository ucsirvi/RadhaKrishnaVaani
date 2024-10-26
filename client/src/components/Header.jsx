import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/1.png"; // Import your logo
import krishna from "../assets/krishna.jpg"; // Background image


const Header = () => {

  const navigate = useNavigate();

 
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg relative py-2 text-white">
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${krishna})` }}
      ></div>

      <nav className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-6">
          <img
            src={logo}
            alt="Radha Krishna"
            className="h-16 w-18 filter brightness-150 contrast-125"
          />
          <h1 className="text-3xl font-extrabold italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 hover:shadow-xl transition duration-300">
            <Link to="/">RadhaKrishna Vaani</Link>
          </h1>
        </div>

        <ul className="flex space-x-10 text-lg">
          <li>
            <Link
              to="/chapters"
              className="text-pink-100 hover:text-pink-300 transition duration-300 font-semibold tracking-wide"
            >
              Divine Dialogues
            </Link>
          </li>
          <li>
            <Link
              to="/reels"
              className="text-purple-100 hover:text-purple-300 transition duration-300 font-semibold tracking-wide"
            >
              Divine Melodies
            </Link>
          </li>
          <li>
            <Link
              to="/images"
              className="text-teal-100 hover:text-teal-300 transition duration-300 font-semibold tracking-wide"
            >
              Divine Visions
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
