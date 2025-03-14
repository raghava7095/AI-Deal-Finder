import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the GoogleOAuthProvider
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId="941277753022-ojc7qrqbasu2ueogf993dihcadm04elm.apps.googleusercontent.com">
        <MainContent />
      </GoogleOAuthProvider>
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"]; // Add paths where Navbar should be hidden

  return (
    <>
      <ToastContainer />
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} /> {/* Hide Navbar on this page */}
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
