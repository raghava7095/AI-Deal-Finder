import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; 
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }
        req.user = user; 
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
export default authMiddleware;
