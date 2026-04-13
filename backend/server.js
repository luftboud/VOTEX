import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import {connectDB, getMeetingsCollection, getUsersCollection} from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    },
}));

app.get("/", (req, res) => {
    res.send("Backend is running");
});

async function findUserByEmail(email) {
    const usersCollection = getUsersCollection();
    return await usersCollection.findOne({ email });
}

async function saveGoogleSub(userId, sub) {
    const usersCollection = getUsersCollection();
    await usersCollection.updateOne(
        { _id: userId },
        { $set: { google_sub: sub } }
    );
}

app.post("/api/auth/google", async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ message: "Missing idToken" });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({ message: "Invalid Google token" });
        }

        const { email, email_verified, sub, name } = payload;

        if (!email || !email_verified) {
            return res.status(401).json({ message: "Email is not verified by Google" });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (!user.google_sub) {
            await saveGoogleSub(user._id, sub);
        } else if (user.google_sub !== sub) {
            return res.status(403).json({ message: "Wrong Google account" });
        }

        req.session.user = {
            id: user._id,
            email: user.email,
            kernel: user.kernel,
            name: user.name || name,
        };

        return res.status(200).json({
            message: "Login successful",
            user: req.session.user,
        });
    } catch (error) {
        console.error("Google auth error:", error);
        return res.status(500).json({ message: "Authentication failed" });
    }
});

app.get("/api/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    return res.status(200).json({ user: req.session.user });
});

app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }

        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logged out" });
    });
});

app.get("/api/meetings", async (req, res) => {
    const raw_meetings = getMeetingsCollection();
    const meetings = await raw_meetings.find({}).toArray();

    return res.status(200).json({ meetings });
});

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();