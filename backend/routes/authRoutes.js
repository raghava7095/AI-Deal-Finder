import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/userModel.js"; // Ensure this exists
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

// ✅ **Protected Route Example (Profile)**
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user });
});

// ✅ **Signup Route**
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

// ✅ **Login Route**
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

// ✅ **Google Auth Route (Forces Account Selection)**
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

// ✅ **Google Callback Route**
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect("http://localhost:3000"); // Change to frontend URL
        });
    }
);

// ✅ **Logout Route**
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: "Logged out successfully" });
    });
});

export default router;
