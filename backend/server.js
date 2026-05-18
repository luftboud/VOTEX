import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { ObjectId } from "mongodb";
import {connectDB, getConvocationsCollection, getMeetingsCollection, getUsersCollection} from "./db.js";

dotenv.config();

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
console.log("NODE_ENV =", process.env.NODE_ENV);

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

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
            id: user._id.toString(),
            email: user.email,
            kernel: user.kernel,
            name: user.name || name,
            major: user.major || null,
            year: user.year || null,
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

function requireAdmin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    if (!req.session.user.kernel) {
        return res.status(403).json({ message: "Admin access required" });
    }

    next();
}

function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    next();
}

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

app.patch("/api/activateMeeting", requireAdmin, async (req, res) => {
    try {
        const raw_meetings = getMeetingsCollection();

        const result = await raw_meetings.findOneAndUpdate(
            { status: "Scheduled" },
            {
                $set: {
                    status: "Active",
                    code: null
                }
            },
            {
                returnDocument: "after"
            }
        );

        if (!result) {
            return res.status(404).json({ message: "Scheduled meeting not found" });
        }

        return res.status(200).json({
            message: "Meeting activated successfully",
            meeting: result
        });
    } catch (error) {
        console.error("Activate meeting error:", error);
        return res.status(500).json({ message: "Failed to activate meeting" });
    }
});

app.get("/api/meetings/active", async (req, res) => {
    try {
        const raw_meetings = getMeetingsCollection();

        const meeting = await raw_meetings.findOne({ status: "Active" });

        if (!meeting) {
            return res.status(404).json({ message: "Active meeting not found" });
        }

        return res.status(200).json({ meeting });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch active meeting" });
    }
});

app.patch("/api/meetings/:id/current", requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { current } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid meeting id" });
        }

        if (current !== null && typeof current !== "number") {
            return res.status(400).json({ message: "Invalid current value" });
        }

        const raw_meetings = getMeetingsCollection();

        const meeting = await raw_meetings.findOne({
            _id: new ObjectId(id)
        });

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        if (meeting.status !== "Active") {
            return res.status(400).json({
                message: "Only active meetings can be updated"
            });
        }

        const agenda = meeting.agenda || [];
        const oldProgress = meeting.progress ?? 0;

        let update = {};

        if (current === null) {
            if (meeting.current === null) {
                return res.status(400).json({
                    message: "No active voting to finish"
                });
            }

            update.current = null;
        } else {
            const questionIndex = agenda.findIndex(
                question => question.item_id === current
            );

            if (questionIndex === -1) {
                return res.status(400).json({
                    message: "Question with this item_id does not exist"
                });
            }

            const expectedNextQuestionIndex = oldProgress;

            if (questionIndex !== expectedNextQuestionIndex) {
                return res.status(400).json({
                    message: "You cannot skip or return to another question"
                });
            }

            update.current = current;
            update.progress = oldProgress + 1;
        }

        await raw_meetings.updateOne(
            { _id: new ObjectId(id) },
            { $set: update }
        );

        const updatedMeeting = await raw_meetings.findOne({
            _id: new ObjectId(id)
        });

        return res.status(200).json({ meeting: updatedMeeting });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to update current question"
        });
    }
});

app.patch("/api/meetings/:id/close", requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid meeting id" });
        }

        const raw_meetings = getMeetingsCollection();

        const meeting = await raw_meetings.findOne({
            _id: new ObjectId(id)
        });

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        if (meeting.status !== "Active") {
            return res.status(400).json({
                message: "Only active meetings can be closed"
            });
        }

        const totalQuestions = meeting.agenda?.length ?? 0;
        const progress = meeting.progress ?? 0;

        if (progress < totalQuestions || meeting.current !== null) {
            return res.status(400).json({
                message: "Cannot close meeting before all voting is completed"
            });
        }

        await raw_meetings.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status: "Closed",
                    current: null
                }
            }
        );

        const updatedMeeting = await raw_meetings.findOne({
            _id: new ObjectId(id)
        });

        return res.status(200).json({ meeting: updatedMeeting });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to close meeting" });
    }
});

app.get("/api/isScheduledMeetings", requireAdmin, async (req, res) => {
    const raw_meetings = getMeetingsCollection();
    const meeting = await raw_meetings.findOne({ status: "Scheduled" });

    if (!meeting) {
        return res.status(404).json({ message: "Active meeting not found" });
    }

    return res.status(200).json({ meeting });
})

async function generateUniqueMeetingCode(collection) {
    let code;
    let exists = true;

    while (exists) {
        code = Math.floor(Math.random() * 900000) + 100000;
        exists = await collection.findOne({ code });
    }

    return code;
}

app.post("/api/createMeeting", requireAdmin, async (req, res) => {

    const collection = getMeetingsCollection();

    if (await collection.findOne({ status: "Scheduled" })) {
        return res.status(409).json({ message: "There already a scheduled meeting" });
    }

    const { title, protocolLink, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: "Invalid meeting data" });
    }

    const normalizedQuestions = questions
        .map(question => question.content?.trim() || question.item_name?.trim() || String(question).trim())
        .filter(Boolean);

    if (normalizedQuestions.length === 0) {
        return res.status(400).json({ message: "Questions cannot be empty" });
    }

    const code = await generateUniqueMeetingCode(collection);

    const meeting = {
        _id: new ObjectId(),
        name: title.trim(),
        datetime: new Date(),
        status: "Scheduled",
        code: code,
        present: [],
        agenda: normalizedQuestions.map((text, index) => ({
            item_id: index + 1,
            item_name: text,
            yes: [],
            no: [],
            abstained: []
        })),
        current: null,
        progress: 0,
        protocol_link: protocolLink.trim(),
    };

    const result = await collection.insertOne(meeting);

    return res.status(201).json({
        message: "Meeting created",
        _id: meeting._id,
        code: meeting.code,
        present: meeting.present
    })
})

function getParticipantFromSession(req) {
    return {
        userId: req.session.user.id.toString(),
        name: req.session.user.name,
        email: req.session.user.email,
        major: req.session.user.major || null,
        year: req.session.user.year || null,
    };
}

app.post("/api/meetings/join-by-code", requireAuth, async (req, res) => {
    try {
        const { code } = req.body;

        const numericCode = Number(code);

        if (!Number.isInteger(numericCode)) {
            return res.status(400).json({ message: "Invalid meeting code" });
        }

        const meetings = getMeetingsCollection();

        const meeting = await meetings.findOne({
            code: numericCode,
            status: "Scheduled",
        });

        if (!meeting) {
            return res.status(404).json({
                message: "Scheduled meeting with this code not found",
            });
        }

        const participant = getParticipantFromSession(req);

        await meetings.updateOne(
            {
                _id: meeting._id,
                status: "Scheduled",
                "present.userId": { $ne: participant.userId },
            },
            {
                $push: {
                    present: participant,
                },
            }
        );

        const updatedMeeting = await meetings.findOne({ _id: meeting._id });

        return res.status(200).json({
            message: "Joined meeting",
            meetingId: updatedMeeting._id,
            meeting: updatedMeeting,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to join meeting" });
    }
});

app.get("/api/meetings/:id/live", requireAuth, async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid meeting id" });
        }

        const meetings = getMeetingsCollection();

        const meeting = await meetings.findOne({
            _id: new ObjectId(id),
        });

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        const userId = req.session.user.id.toString();

        const isPresent = meeting.present?.some(
            participant => participant.userId === userId
        );

        if (!isPresent) {
            return res.status(403).json({
                message: "You are not present in this meeting",
            });
        }

        if (meeting.status === "Scheduled") {
            return res.status(200).json({
                state: "waiting",
                meeting,
                currentQuestion: null,
            });
        }

        if (meeting.status === "Closed") {
            return res.status(200).json({
                state: "finished",
                meeting,
                currentQuestion: null,
            });
        }

        if (meeting.status === "Active") {
            const currentQuestion = meeting.agenda.find(
                question => question.item_id === meeting.current
            );

            if (!currentQuestion) {
                return res.status(200).json({
                    state: "waiting",
                    meeting,
                    currentQuestion: null,
                });
            }

            const alreadyVoted =
                currentQuestion.yes?.some(v => v.userId === userId) ||
                currentQuestion.no?.some(v => v.userId === userId) ||
                currentQuestion.abstained?.some(v => v.userId === userId);

            return res.status(200).json({
                state: alreadyVoted ? "vote_recorded" : "voting",
                meeting,
                currentQuestion: {
                    id: currentQuestion.item_id,
                    title: currentQuestion.item_name,
                },
            });
        }

        return res.status(400).json({ message: "Unknown meeting status" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch meeting state" });
    }
});

app.post("/api/meetings/:id/vote", requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { questionId, choice } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid meeting id" });
        }

        const allowedChoices = ["yes", "no", "abstained"];

        if (!allowedChoices.includes(choice)) {
            return res.status(400).json({ message: "Invalid vote choice" });
        }

        const meetings = getMeetingsCollection();

        const meeting = await meetings.findOne({
            _id: new ObjectId(id),
            status: "Active",
        });

        if (!meeting) {
            return res.status(404).json({ message: "Active meeting not found" });
        }

        const userId = req.session.user.id.toString();

        const isPresent = meeting.present?.some(
            participant => participant.userId === userId
        );

        if (!isPresent) {
            return res.status(403).json({
                message: "You are not present in this meeting",
            });
        }

        if (String(meeting.current) !== String(questionId)) {
            return res.status(400).json({
                message: "This question is not currently active",
            });
        }

        const question = meeting.agenda.find(
            item => String(item.item_id) === String(questionId)
        );

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const alreadyVoted =
            question.yes?.some(v => v.userId === userId) ||
            question.no?.some(v => v.userId === userId) ||
            question.abstained?.some(v => v.userId === userId);

        if (alreadyVoted) {
            return res.status(409).json({
                message: "You have already voted for this question",
            });
        }

        const participant = getParticipantFromSession(req);
        const field = `agenda.$.${choice}`;

        await meetings.updateOne(
            {
                _id: new ObjectId(id),
                status: "Active",
                "agenda.item_id": Number(questionId),
            },
            {
                $push: {
                    [field]: participant,
                },
            }
        );

        return res.status(200).json({
            message: "Vote recorded",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to record vote" });
    }
});

app.get("/api/user_collection", requireAdmin, async (req, res) => {
    const users = getUsersCollection();
    const usersCount = await users.countDocuments({
        kernel: { $ne: true }
    });

    return res.status(200).json({ count: usersCount })
})

app.post("/api/convocations", requireAdmin, async (req, res) => {
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

        const meetingsCollection = getMeetingsCollection();
        await meetingsCollection.deleteMany({});

        const convocationsCollection = getConvocationsCollection();
        await convocationsCollection.deleteMany({});

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

app.get("/api/convocations/current", requireAdmin, async (req, res) => {
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

app.get("/api/convocations/:id", requireAdmin, async (req, res) => {
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

app.get("/api/representatives", requireAdmin, async (req, res) => {
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

app.post("/api/representatives", requireAdmin, async (req, res) => {
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

app.delete("/api/representatives/:id", requireAdmin, async (req, res) => {
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

async function init() {
    try {
        await connectDB();
        await backfillActiveConvocation();
    } catch (error) {
        console.error("Failed to initialize server:", error);
    }
}

await init();

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;