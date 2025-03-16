import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Ensure Navbar updates
    navigate("/");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">AI Deal Finder</Link>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/about" className="hover:text-gray-300">About</Link>
      </div>

      <div className="relative" ref={dropdownRef}>
        {isLoggedIn ? (
          <div>
            <button
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="User menu"
            >
              <FaUserCircle size={30} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-gray-900 rounded shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
