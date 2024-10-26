import { Link } from "react-router-dom";
import logo from "../assets/1.png";
import linkedinLogo from "../assets/linkedinLogo.png";
import instagramLogo from "../assets/instagramLogo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-2">
      <div className="container mx-auto">
        <div className="flex justify-center items-center flex-col sm:flex-row">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img
              src={logo}
              alt="Radha Krishna"
              className="h-16 w-18 filter brightness-150 contrast-125"
            />
            <h1 className="text-3xl font-extrabold italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 hover:shadow-xl transition duration-300">
              <Link to="/">RadhaKrishna Vaani</Link>
            </h1>
          </div>
        </div>
        <div>
          <ul className="flex justify-center flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-6 text-lg mt-2 sm:mt-0">
            <li>
              <Link
                to="/about"
                className="text-pink-100 hover:text-pink-300 transition duration-300 font-semibold tracking-wide"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-indigo-100 hover:text-indigo-300 transition duration-300 font-semibold tracking-wide"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center space-x-6 mt-2">
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
        </div>
      </div>

      <div className="text-center text-sm mt-2 text-gray-200">
        &copy; 2024 RadhaKrishna Vaani. All Rights Reserved.
      </div>

      <div className="text-center text-sm mt-2 text-gray-300">
        Made by <span className="font-semibold">Umesh Choudhary</span>
      </div>
    </footer>
  );
};

export default Footer;
