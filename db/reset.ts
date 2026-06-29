import { sql } from "drizzle-orm";
import { db } from "./index";

async function resetDatabase() {
    try {
        await db.execute(sql`DROP TABLE IF EXISTS stats CASCADE;`);
        await db.execute(sql`DROP TABLE IF EXISTS credits CASCADE;`);

        console.log("All tables dropped successfully.");

        console.log("Database reset successfully.");
    } catch (error) {
        console.error("Error resetting the database:", error);
    }
}

// Call the resetDatabase function
resetDatabase();