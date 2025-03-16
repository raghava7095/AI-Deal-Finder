// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";  // Import GoogleOAuthProvider
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard"; // Import Dashboard component
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Your Google OAuth Client ID
const clientId = '941277753022-ojc7qrqbasu2ueogf993dihcadm04elm.apps.googleusercontent.com';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <MainContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    </GoogleOAuthProvider>
    <Router>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <MainContent />
      </GoogleOAuthProvider>
    </Router>
  );
};

const MainContent = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"]; // Add paths where Navbar should be hidden

  return (
    <>
      <ToastContainer />
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar isLoggedIn={isLoggedIn} /> 
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn to Auth */}
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add this line */}
      </Routes>
    </>
  );
};
export default App;
