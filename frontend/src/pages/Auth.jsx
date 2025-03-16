import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Auth = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Google Login Success
  const handleGoogleLoginSuccess = (response) => {
    if (!response.credential) {
      toast.error("Google login failed! No token received.");
      return;
    }
    localStorage.setItem("token", response.credential);
    setIsLoggedIn(true); // ✅ Ensure state updates
    toast.success("Google login successful! 🎉");

    setTimeout(() => {
      navigate("/dashboard"); // ✅ Ensure redirection after state update
    }, 500);
  };

  // ✅ Handle Google Login Failure
  const handleGoogleLoginFailure = () => {
    toast.error("Google login failed! Please try again.");
  };

  // ✅ Handle Form Login
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password123") {
      localStorage.setItem("token", "mock-auth-token");
      setIsLoggedIn(true);
      toast.success("Login successful! 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } else {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <ToastContainer position="top-right" autoClose={2000} />

        <h2 className="text-2xl font-bold mb-4 text-center text-[#577D73]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded text-[#577D73]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded text-[#577D73]"
            required
          />
          <button
            type="submit"
            className="bg-[#577D73] text-white py-2 rounded hover:bg-[#344B45] transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            theme="outline"
          />
        </div>

        <p className="mt-4 text-center text-[#577D73]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-[#344B45] cursor-pointer font-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
