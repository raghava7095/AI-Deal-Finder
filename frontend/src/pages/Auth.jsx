import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Google login success handler
  const handleGoogleLoginSuccess = (response) => {
    toast.success("Google login successful! 🎉");
    console.log(response); // Contains the user's Google profile info
  };

  // Google login failure handler
  const handleGoogleLoginFailure = (error) => {
    toast.error("Google login failed! Please try again.");
    console.log(error);
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#ed0cf" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative animate-fadeIn">
        <ToastContainer position="top-right" autoClose={2000} />
        
        <h2 className="text-2xl font-bold mb-4 text-center text-[#577D73]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded text-[#577D73]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded text-[#577D73]"
            required
          />
          <button className="bg-[#577D73] text-white py-2 rounded hover:bg-[#344B45] transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap={true} // Optional: enables one-tap login
            theme="outline" // Optional: use a button style
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
