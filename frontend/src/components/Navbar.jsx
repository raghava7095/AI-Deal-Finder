import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/auth");
  };

  return (
    <nav className="w-full flex justify-end items-center p-4 sm:p-6 absolute top-0 bg-white shadow-md">
      {userData ? (
        <div className="relative group">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-black text-white cursor-pointer text-lg">
            {userData.name[0].toUpperCase()}
          </div>
          <div className="absolute top-12 right-0 bg-gray-100 rounded-lg shadow-lg hidden group-hover:block z-10">
            <ul className="p-2 w-40">
              <li className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-md">
                Profile
              </li>
              <li
                className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-md"
                onClick={handleLogout}
              >
                Log Out
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/auth")}
          className="flex items-center gap-2 border border-gray-600 rounded-full px-6 py-2 text-gray-600 hover:bg-gray-200 transition duration-300"
        >
          Login <img src={assets.arrow_icon} alt="Arrow" className="w-5" />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
