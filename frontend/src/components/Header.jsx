import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  const userName = "Guest";

  // Function to Scroll Down to Target Section
  const handleScroll = () => {
    const targetSection = document.getElementById("target-section");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Fallback for older browsers
      setTimeout(() => {
        targetSection.scrollIntoView({ block: "start" });
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center mt-24 p-4 text-gray-700 text-center">
      {assets.header_img && (
        <img src={assets.header_img} alt="Profile" className="w-36 h-36 rounded-full mb-6" />
      )}
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl">
        Hey {userName}!
        {assets.hand_wave && <img src={assets.hand_wave} alt="Wave" className="w-8" />}
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to our APP</h2>
      <p className="mb-8 max-w-md text-lg text-gray-600">
        Quickly Login or Register to start your journey and discover amazing deals.
      </p>
      <button
        onClick={handleScroll}
        className="border border-gray-600 rounded-full px-8 py-2.5 text-gray-700 hover:bg-gray-200 transition duration-300"
        aria-label="Scroll to Target Section"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
