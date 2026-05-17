import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

export async function connectDB() {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not configured. Set MONGO_URL in .env to connect to MongoDB.");
    }

    try {
        client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        db = client.db(process.env.MONGO_DB_NAME);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

export function getUsersCollection() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB() first.");
    }
    return db.collection("users");
}

export function getMeetingsCollection() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB() first.");
    }
    return db.collection("meetings");
}
