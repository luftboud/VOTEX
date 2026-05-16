import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

async function normalize() {
    const url = process.env.MONGO_URL;
    const dbName = process.env.MONGO_DB_NAME;

    if (!url) {
        console.error("MONGO_URL is not set in .env — aborting migration.");
        process.exit(1);
    }

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const meetings = db.collection("meetings");

    const query = { $or: [ { current: { $exists: true } }, { agenda: { $exists: true } } ] };
    const docs = await meetings.find(query).toArray();

    if (!docs.length) {
        console.log("No meetings found that need normalization.");
        await client.close();
        return;
    }

    const backupName = `meetings_backup_${Date.now()}`;
    const backupCol = db.collection(backupName);
    await backupCol.insertMany(docs);
    console.log(`Backed up ${docs.length} meeting(s) to collection ${backupName}`);

    let updated = 0;

    for (const m of docs) {
        const current = m.current;

        // Determine the raw source for title/text
        let title = "";
        let text = "";
        const yes = new Set();
        const no = new Set();
        const abstained = new Set();

        function collectVotesFrom(obj) {
            if (!obj || typeof obj !== "object") return;
            if (Array.isArray(obj.yes)) obj.yes.forEach((v) => yes.add(String(v)));
            if (Array.isArray(obj.no)) obj.no.forEach((v) => no.add(String(v)));
            if (Array.isArray(obj.abstained)) obj.abstained.forEach((v) => abstained.add(String(v)));
            // nested raw object
            if (obj.raw && typeof obj.raw === "object") collectVotesFrom(obj.raw);
        }

        if (current !== undefined && current !== null) {
            if (typeof current === "string" || typeof current === "number") {
                title = String(current);
            } else if (typeof current === "object") {
                if (typeof current.raw === "string" || typeof current.raw === "number") {
                    title = String(current.raw);
                } else if (current.title) {
                    title = String(current.title);
                } else if (current.item_name) {
                    title = String(current.item_name);
                }

                // collect votes from possible shapes
                collectVotesFrom(current);
            }
        }

        // If title still empty, try to infer from agenda active/latest
        if (!title) {
            const agenda = Array.isArray(m.agenda) ? m.agenda : [];
            const active = agenda.find((q) => q && (q.isActive || q.active || q.current));
            const source = active || (agenda.length ? agenda[agenda.length - 1] : null);
            if (source) {
                if (typeof source === "string" || typeof source === "number") title = String(source);
                else if (source.title) title = String(source.title);
                else if (source.item_name) title = String(source.item_name);
                // collect any votes on the agenda item
                collectVotesFrom(source);
            }
        }

        const normalized = {
            title: title || "Поточне питання",
            text: text || "",
            yes: Array.from(yes),
            no: Array.from(no),
            abstained: Array.from(abstained),
        };

        // Only update if differences present
        const needUpdate = JSON.stringify(m.current) !== JSON.stringify(normalized);
        if (needUpdate) {
            await meetings.updateOne({ _id: m._id }, { $set: { current: normalized } });
            updated += 1;
            console.log(`Normalized meeting ${m._id} (${m.code || "unknown code"})`);
        }
    }

    console.log(`Normalization complete. Updated ${updated} meeting(s).`);
    await client.close();
}

normalize().catch((err) => {
    console.error(err);
    process.exit(1);
});
