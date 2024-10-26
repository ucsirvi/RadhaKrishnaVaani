import { SignIn } from "@clerk/clerk-react";
import radhaBackground from "../assets/2.jpg";

function SignInPage() {
  return (
    <main
      className="min-h-screen flex justify-center items-center text-white"
      style={{
        backgroundImage: `url(${radhaBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.8)",
      }}
    >
      <SignIn
        className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md"
        appearance={{
          variables: {
            colorPrimary: "#ff6f61",
            colorText: "#ffffff",
            colorBackground: "#3f2c4b",
          },
          elements: {
            card: "rounded-lg border border-gray-800",
            buttonPrimary:
              "bg-transparent border border-pink-500 hover:bg-pink-500 hover:text-white text-pink-500 rounded-full px-4 py-2 transition duration-300 shadow-lg",
            input:
              "border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400",
          },
        }}
      />
    </main>
  );
}

export default SignInPage;
