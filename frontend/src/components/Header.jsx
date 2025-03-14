import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  const userName = "Guest"; // Placeholder for username (Replace when integrating backend)

  return (
    <div className="flex flex-col items-center mt-20 p-4 text-gray-700 text-center">
      {/* Profile Image */}
      <img
        src={assets.header_img}
        alt="Profile"
        className="w-36 h-36 rounded-full mb-6"
      />

      {/* Greeting */}
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl">
        Hey {userName}! 
        <img src={assets.hand_wave} alt="Wave" className="w-8" />
      </h1>

      {/* Welcome Message */}
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to our APP</h2>

      {/* Description */}
      <p className="mb-8 max-w-md">
        Quickly Login or Register to start our journey
      </p>

      {/* Get Started Button */}
      <button className="border border-gray-600 rounded-full px-8 py-2.5 text-gray-700 hover:bg-gray-200 transition duration-300">
        Get Started
      </button>
    </div>
  );
};

export default Header;
