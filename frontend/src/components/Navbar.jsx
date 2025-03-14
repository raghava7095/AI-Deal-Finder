import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Update state to reflect logout
    navigate("/"); // Redirect to Home
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        AI Deal Finder
      </Link>

      {/* Links */}
      <div className="flex gap-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/about" className="hover:text-gray-300">About</Link>
      </div>

      {/* User Icon or Authentication Buttons */}
      <div className="relative">
        {user ? (
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle size={30} />
          </div>
        ) : (
          <Link
            to="/auth"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}

        {/* Dropdown Menu */}
        {showDropdown && user && (
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
    </nav>
  );
};

export default Navbar;
