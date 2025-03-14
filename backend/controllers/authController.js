import jwt from "jsonwebtoken";

export const googleAuthCallback = async (req, res) => {
    try {
        const user = req.user; // Fetched from passport or OAuth
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        console.log("Google JWT Token:", token); // 🔥 LOG TOKEN

        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Google authentication failed" });
    }
};
