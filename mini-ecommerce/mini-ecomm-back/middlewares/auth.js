import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export async function verifyCredentials(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization token missing or malformed" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);

        const user = await userModel.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found or token invalid" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("verifyCredentials error:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

export async function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        return res.status(401).json({ error: "You are not logged in" });
    }
}

export async function isAdmin(req, res, next) {
    if (req.user?.role === "admin") {
        return next();
    } else {
        return res.status(403).json({ error: "You are not authorized (admin only)" });
    }
}
