import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (response) => {
    toast.success("Google login successful! 🎉");

    // Store user details in localStorage
    const user = {
      credential: response.credential, // JWT token (if needed)
    };

    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to the dashboard
    navigate("/dashboard");
  const handleGoogleLoginSuccess = async (response) => {
    console.log("Google Login Response:", response);
    
    if (!response.credential) {
      toast.error("Google login failed! No token received.");
      return;
    }

    try {
      const token = response.credential; // Extract Google JWT token
      console.log("Google Token:", token);

      // Sending the token to backend for validation
      const res = await axios.post(`${API_BASE_URL}/auth/google`, { token });

      if (res.data.success) {
        toast.success("Google login successful! 🎉");
        localStorage.setItem("token", res.data.token); // Save the token in localStorage
        navigate("/Home"); // Redirect to home page after successful login
      } else {
        toast.error("Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed! Please try again.");
    }
  };

  // Google login failure handler
  const handleGoogleLoginFailure = (error) => {
    toast.error("Google login failed! Please try again.");
    console.error(error);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative animate-fadeIn">
        <ToastContainer position="top-right" autoClose={2000} />

        <h2 className="text-2xl font-bold mb-4 text-center text-[#577D73]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-2 border rounded text-[#577D73]" required />
          <input type="password" placeholder="Password" className="p-2 border rounded text-[#577D73]" required />
          <button className="bg-[#577D73] text-white py-2 rounded hover:bg-[#344B45] transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap={true}
            theme="outline"
          />
        </div>

        <p className="mt-4 text-center text-[#577D73]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-[#344B45] cursor-pointer font-semibold" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
