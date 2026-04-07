import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

let db;
let usersCollection;

export async function connectDB() {
    try {
        await client.connect();
        db = client.db(process.env.MONGO_DB_NAME);
        usersCollection = db.collection("users");
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