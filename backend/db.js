import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const useInMemoryStore = !process.env.MONGO_URL;

const memoryState = {
    users: [
        {
            _id: "demo-user",
            email: "demo@example.com",
            kernel: false,
            name: "Demo User",
        },
    ],
    meetings: [
        {
            _id: "demo-meeting",
            code: "1234",
            name: "Демо-засідання",
            datetime: new Date().toISOString(),
            status: "Waiting",
            agenda: [],
        },
    ],
};

let client;
let db;
let usersCollection;
let meetingsCollection;

function matchesQuery(document, query = {}) {
    if (query.$or) {
        return query.$or.some((branch) => matchesQuery(document, branch));
    }

    return Object.entries(query).every(([key, value]) => String(document?.[key]) === String(value));
}

function createMemoryCollection(key) {
    return {
        async findOne(query = {}) {
            return memoryState[key].find((document) => matchesQuery(document, query)) || null;
        },
        find(query = {}) {
            const documents = memoryState[key].filter((document) => matchesQuery(document, query));

            return {
                async toArray() {
                    return documents.map((document) => ({ ...document }));
                },
            };
        },
        async updateOne(filter, update) {
            const index = memoryState[key].findIndex((document) => matchesQuery(document, filter));

            if (index === -1) {
                return { matchedCount: 0, modifiedCount: 0 };
            }

            if (update?.$set) {
                memoryState[key][index] = {
                    ...memoryState[key][index],
                    ...update.$set,
                };
            }

            return { matchedCount: 1, modifiedCount: 1 };
        },
    };
}

export async function connectDB() {
    if (useInMemoryStore) {
        usersCollection = createMemoryCollection("users");
        meetingsCollection = createMemoryCollection("meetings");
        console.warn("MONGO_URL is missing. Using in-memory demo data for local development.");
        return;
    }

    try {
        client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        db = client.db(process.env.MONGO_DB_NAME);
        usersCollection = db.collection("users");
        meetingsCollection = db.collection("meetings");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

// export function getDB() {
//     if (!db) {
//         throw new Error("Database not initialized. Call connectDB() first.");
//     }
//     return db;
// }

export function getUsersCollection() {
    if (!usersCollection) {
        throw new Error("Collection not initialized. Call connectDB() first.");
    }
    return usersCollection;
}

export function getMeetingsCollection() {
    if (!meetingsCollection) {
        throw new Error("Collection not initialized. Call connectDB() first.");
    }
    return meetingsCollection;
}