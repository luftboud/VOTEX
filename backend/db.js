import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;
let usersCollection;
let meetingsCollection;
let convocationsCollection;

export async function connectDB() {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not configured. Set MONGO_URL in .env to connect to MongoDB.");
    }

    try {
        client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        db = client.db(process.env.MONGO_DB_NAME);
        usersCollection = db.collection("users");
        meetingsCollection = db.collection("meetings");
        convocationsCollection = db.collection("convocations");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

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

export function getConvocationsCollection() {
    if (!convocationsCollection) {
        throw new Error("Collection not initialized. Call connectDB() first.");
    }
    return convocationsCollection;
}