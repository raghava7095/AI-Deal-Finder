import { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      toast.success("Logged in successfully! 🚀");
    } else {
      toast.success("Account created successfully! 🎉");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative animate-fadeIn">
        <ToastContainer position="top-right" autoClose={2000} />

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-[#577D73]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 border rounded text-[#577D73]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded text-[#577D73]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded text-[#577D73]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-[#577D73] text-white py-2 rounded hover:bg-[#344B45] transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Social Login Icons */}
        <div className="flex justify-center gap-6 mt-4">
          <FaGoogle className="text-[#DB4437] text-3xl cursor-pointer" onClick={() => toast.info("Google Login coming soon!")} />
          <FaFacebook className="text-[#1877F2] text-3xl cursor-pointer" onClick={() => toast.info("Facebook Login coming soon!")} />
        </div>

        {/* Toggle Login/Signup */}
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
