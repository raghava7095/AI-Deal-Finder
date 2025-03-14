import { OAuth2Client } from "google-auth-library";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/userModel.js"; 
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";
dotenv.config();
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user });
});
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = user.password ? await bcrypt.compare(password, user.password) : false;
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
router.get(
    "/google",
    (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            next();
        });
    },
    passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    async (req, res, next) => {
        if (!req.user) return res.redirect("http://localhost:3000?error=authentication_failed");

        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.redirect(`http://localhost:3000?token=${token}`);
    }
);
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.json({ message: "Logged out successfully" });
    });
});
router.post("/google", async (req, res) => {
    const { token } = req.body;  // Extract the token from the request body
  
    if (!token) {
      return res.status(400).json({ success: false, message: "No token provided" });
    }
  
    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Your Google Client ID (ensure it's correct)
      });
  
      // Get the payload (user data) from the verified token
      const payload = ticket.getPayload();
      console.log("Google Payload:", payload); // Log the payload for debugging purposes
  
      // Check if the user already exists in the database
      let user = await User.findOne({ email: payload.email });
      
      if (!user) {
        // If the user does not exist, create a new user
        user = new User({
          name: payload.name,
          email: payload.email,
          profilePic: payload.picture,
        });
        await user.save();  // Save the new user in the database
      }
  
      // Generate a JWT token for your own authentication (for your app)
      const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      // Return the JWT token and user details
      return res.json({ success: true, token: jwtToken, user });
  
    } catch (error) {
      console.error("Google Auth Error:", error);  // Log the error for debugging
      return res.status(400).json({ success: false, message: "Invalid Google token" });
    }
  });
export default router;
