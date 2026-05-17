import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { ObjectId } from "mongodb";
import {connectDB, getConvocationsCollection, getMeetingsCollection, getUsersCollection} from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const UCU_EMAIL_RE = /^[^\s@]+@ucu\.edu\.ua$/i;

function validateYearRange(value) {
    if (typeof value !== "string") return false;
    const m = value.match(/^(\d{4})-(\d{4})$/);
    if (!m) return false;
    const y1 = Number(m[1]);
    const y2 = Number(m[2]);
    if (y2 !== y1 + 1) return false;
    const currentYear = new Date().getFullYear();
    return y1 >= 2000 && y1 <= currentYear + 5;
}

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

app.post("/api/convocations", async (req, res) => {
    try {
        const { name, year } = req.body;

        if (!name || !year) {
            return res.status(400).json({ message: "Name and year are required" });
        }

        if (!validateYearRange(year)) {
            return res.status(400).json({ message: "Year must be in the form YYYY-YYYY with consecutive years (e.g. 2026-2027)" });
        }

        const usersCollection = getUsersCollection();
        await usersCollection.deleteMany({ kernel: { $ne: true } });

        const convocationsCollection = getConvocationsCollection();
        await convocationsCollection.updateMany({ isActive: true }, { $set: { isActive: false } });

        const doc = {
            name,
            year,
            descr: null,
            meetings: [],
            isActive: true,
        };
        const result = await convocationsCollection.insertOne(doc);

        return res.status(201).json({ convocation: { _id: result.insertedId, ...doc } });
    } catch (error) {
        console.error("Create convocation error:", error);
        return res.status(500).json({ message: "Failed to create convocation" });
    }
});

app.get("/api/convocations/current", async (req, res) => {
    try {
        const convocationsCollection = getConvocationsCollection();
        const current = await convocationsCollection.findOne({ isActive: true });

        if (!current) {
            return res.status(404).json({ message: "No current convocation" });
        }

        return res.status(200).json({ convocation: current });
    } catch (error) {
        console.error("Get current convocation error:", error);
        return res.status(500).json({ message: "Failed to fetch current convocation" });
    }
});

app.get("/api/convocations/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid convocation id" });
        }

        const convocationsCollection = getConvocationsCollection();
        const convocation = await convocationsCollection.findOne({ _id: new ObjectId(id) });

        if (!convocation) {
            return res.status(404).json({ message: "Convocation not found" });
        }

        return res.status(200).json({ convocation });
    } catch (error) {
        console.error("Get convocation error:", error);
        return res.status(500).json({ message: "Failed to fetch convocation" });
    }
});

app.get("/api/representatives", async (req, res) => {
    try {
        const usersCollection = getUsersCollection();
        const representatives = await usersCollection
            .find({ kernel: { $ne: true } })
            .toArray();

        return res.status(200).json({ representatives });
    } catch (error) {
        console.error("List representatives error:", error);
        return res.status(500).json({ message: "Failed to fetch representatives" });
    }
});

app.post("/api/representatives", async (req, res) => {
    try {
        const { name, email, avatar, faculty, major, year } = req.body;

        if (!name || !email || !faculty || !major || !year) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const trimmedEmail = String(email).trim();
        if (!UCU_EMAIL_RE.test(trimmedEmail)) {
            return res.status(400).json({ message: "Електронна пошта має закінчуватися на @ucu.edu.ua" });
        }

        const usersCollection = getUsersCollection();

        const conflict = await usersCollection.findOne({
            kernel: { $ne: true },
            major,
            year: String(year),
        });

        if (conflict) {
            return res.status(409).json({ message: "Цей слот (програма + курс) вже зайнятий" });
        }

        const newRep = {
            name: name,
            avatar: avatar || "",
            kernel: false,
            email: trimmedEmail,
            token: "",
            google_sub: "",
            faculty: faculty,
            major: major,
            year: String(year),
        };

        const result = await usersCollection.insertOne(newRep);

        return res.status(201).json({ representative: { _id: result.insertedId, ...newRep } });
    } catch (error) {
        console.error("Add representative error:", error);
        return res.status(500).json({ message: "Failed to add representative" });
    }
});

app.delete("/api/representatives/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid representative id" });
        }

        const usersCollection = getUsersCollection();
        const result = await usersCollection.deleteOne({
            _id: new ObjectId(id),
            kernel: { $ne: true },
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Representative not found" });
        }

        return res.status(200).json({ message: "Representative removed" });
    } catch (error) {
        console.error("Remove representative error:", error);
        return res.status(500).json({ message: "Failed to remove representative" });
    }
});

async function backfillActiveConvocation() {
    const convocationsCollection = getConvocationsCollection();
    const anyActive = await convocationsCollection.findOne({ isActive: true });
    if (anyActive) return;

    const newest = await convocationsCollection.find({}).sort({ _id: -1 }).limit(1).next();
    if (newest) {
        await convocationsCollection.updateOne({ _id: newest._id }, { $set: { isActive: true } });
        console.log(`Backfilled isActive=true on convocation ${newest._id}`);
    }
}

async function startServer() {
    try {
        await connectDB();
        await backfillActiveConvocation();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();