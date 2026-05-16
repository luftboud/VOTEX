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
const sessionSecret = process.env.SESSION_SECRET || "votex-dev-secret";

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: sessionSecret,
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

function normalizeMeetingCode(meeting) {
    return String(
        meeting?.code ??
        meeting?.meeting_code ??
        meeting?.meetingCode ??
        meeting?.inviteCode ??
        meeting?._id ??
        ""
    ).trim();
}

function buildMeetingLookupQuery(meetingCode) {
    const trimmedCode = String(meetingCode || "").trim();
    const numericCode = Number(trimmedCode);
    const codeQueries = [
        { code: trimmedCode },
        { meeting_code: trimmedCode },
        { meetingCode: trimmedCode },
        { inviteCode: trimmedCode },
        { _id: trimmedCode },
    ];

    if (!Number.isNaN(numericCode) && trimmedCode !== "") {
        codeQueries.unshift({ code: numericCode });
    }

    return { $or: codeQueries };
}

function isScheduledMeeting(meeting) {
    return String(meeting?.status ?? "").toLowerCase() === "scheduled";
}

function normalizeQuestion(question) {
    if (!question) {
        return null;
    }

    return {
        id: question.id ?? question.item_id ?? question.questionId ?? question._id ?? null,
        title: question.title ?? question.item_name ?? question.name ?? "Поточне питання",
        text: question.text ?? question.description ?? question.question ?? question.content ?? question.item_name ?? "",
        item_id: question.item_id ?? question.id ?? question.questionId ?? question._id ?? null,
        item_name: question.item_name ?? question.title ?? question.name ?? question.text ?? "",
        yes: Array.isArray(question.yes) ? question.yes : [],
        no: Array.isArray(question.no) ? question.no : [],
        abstained: Array.isArray(question.abstained) ? question.abstained : [],
        raw: question,
    };
}

function extractCurrentQuestion(meeting) {
    const directQuestion = meeting?.currentQuestion ?? meeting?.current_question ?? meeting?.activeQuestion ?? meeting?.active_question;

    if (directQuestion) {
        return normalizeQuestion(directQuestion);
    }

    const agenda = Array.isArray(meeting?.agenda) ? meeting.agenda : [];
    const activeAgendaQuestion = agenda.find((question) => question?.isActive || question?.active || question?.current);

    if (activeAgendaQuestion) {
        return normalizeQuestion(activeAgendaQuestion);
    }

    const latestAgendaQuestion = agenda.length > 0 ? agenda[agenda.length - 1] : null;

    if (latestAgendaQuestion) {
        return normalizeQuestion(latestAgendaQuestion);
    }

    return null;
}

function getMeetingState(meeting) {
    const status = String(meeting?.status ?? meeting?.state ?? "").toLowerCase();

    if (["closed", "finished", "complete", "completed", "ended"].includes(status)) {
        return "finished";
    }

    if (extractCurrentQuestion(meeting)) {
        return "voting";
    }

    return "waiting";
}

app.get("/api/meetings/code/:meetingCode", async (req, res) => {
    try {
        const meetingCode = String(req.params.meetingCode || "").trim();

        if (!meetingCode) {
            return res.status(400).json({ message: "Missing meeting code" });
        }

        const rawMeetings = getMeetingsCollection();
        const meeting = await rawMeetings.findOne(buildMeetingLookupQuery(meetingCode));

        if (!meeting || !isScheduledMeeting(meeting)) {
            return res.status(404).json({ state: "not_found", message: "Meeting not found" });
        }

        return res.status(200).json({
            state: getMeetingState(meeting),
            meeting: {
                id: String(meeting._id),
                code: normalizeMeetingCode(meeting),
                name: meeting.name,
                status: meeting.status,
                datetime: meeting.datetime,
            },
            currentQuestion: extractCurrentQuestion(meeting),
        });
    } catch (error) {
        console.error("Failed to fetch meeting by code:", error);
        return res.status(500).json({ message: "Failed to fetch meeting" });
    }
});

app.get("/api/meetings/code/:meetingCode/current-question", async (req, res) => {
    try {
        const meetingCode = String(req.params.meetingCode || "").trim();
        const rawMeetings = getMeetingsCollection();
        const meeting = await rawMeetings.findOne(buildMeetingLookupQuery(meetingCode));

        if (!meeting || !isScheduledMeeting(meeting)) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        const currentQuestion = extractCurrentQuestion(meeting);

        if (!currentQuestion) {
            return res.status(204).send();
        }

        return res.status(200).json({ currentQuestion, state: getMeetingState(meeting) });
    } catch (error) {
        console.error("Failed to fetch current question:", error);
        return res.status(500).json({ message: "Failed to fetch current question" });
    }
});

app.post("/api/meetings/code/:meetingCode/vote", async (req, res) => {
    try {
        const meetingCode = String(req.params.meetingCode || "").trim();
        const { questionId, choice } = req.body || {};

        if (!meetingCode || !questionId || !choice) {
            return res.status(400).json({ message: "Missing vote payload" });
        }

        const rawMeetings = getMeetingsCollection();
        const meeting = await rawMeetings.findOne(buildMeetingLookupQuery(meetingCode));

        if (!meeting || !isScheduledMeeting(meeting)) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        const agenda = Array.isArray(meeting.agenda) ? meeting.agenda : [];
        const questionIndex = agenda.findIndex((question) => String(question.item_id ?? question.id ?? question.questionId ?? question._id) === String(questionId));

        if (questionIndex === -1) {
            return res.status(404).json({ message: "Question not found" });
        }

        const selectedField = choice === "yes" ? "yes" : choice === "no" ? "no" : "abstained";
        const userId = req.session.user?.id ? String(req.session.user.id) : `guest:${Date.now()}`;
        const question = agenda[questionIndex];
        const nextVotes = Array.isArray(question[selectedField]) ? [...question[selectedField]] : [];

        if (!nextVotes.includes(userId)) {
            nextVotes.push(userId);
        }

        const updatedAgenda = [...agenda];
        updatedAgenda[questionIndex] = {
            ...question,
            [selectedField]: nextVotes,
        };

        await rawMeetings.updateOne(
            { _id: meeting._id },
            {
                $set: {
                    agenda: updatedAgenda,
                },
            }
        );

        return res.status(200).json({
            message: "Vote recorded",
            questionId,
            choice: selectedField,
        });
    } catch (error) {
        console.error("Failed to record vote:", error);
        return res.status(500).json({ message: "Failed to record vote" });
    }
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