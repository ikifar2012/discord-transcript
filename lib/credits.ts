import { credits, db, stats } from "@/db";
import { eq } from "drizzle-orm";

async function enoughCredits(params: { discordId: string; amount: number }): Promise<boolean> {
    try {
        const remaining = await creditsRemaining({ discordId: params.discordId });
        const hasEnough = remaining >= params.amount;
        return hasEnough;
    } catch (error) {
        console.error("Failed to check enough credits", {
            discordId: params.discordId,
            amount: params.amount,
            error,
        });
        throw error;
    }
}

async function creditsRemaining(params: { discordId: string }): Promise<number> {
    try {
        const result = await db.select({
            amount: credits.amount
        }).from(credits).where(eq(credits.discord_id, params.discordId)).limit(1);
        return result.length > 0 ? result[0].amount : 0;
    } catch (error) {
        console.error("Failed to get remaining credits", {
            discordId: params.discordId,
            error,
        });
        throw error;
    }
}
async function addCredits(params: { discordId: string; amount: number }): Promise<void> {
    try {
        const currentCredits = await creditsRemaining({ discordId: params.discordId });
        const newAmount = currentCredits + params.amount;

        await db.update(credits)
            .set({ amount: newAmount })
            .where(eq(credits.discord_id, params.discordId));

        const totalSecondsPurchased = await db.select({
            totalSecondsPurchased: stats.totalSecondsPurchased
        }).from(stats).where(eq(stats.discord_id, params.discordId)).limit(1);


        if (totalSecondsPurchased[0]) {
            const newSeconds = totalSecondsPurchased[0].totalSecondsPurchased + params.amount;
            await db.update(stats)
                .set({ totalSecondsPurchased: newSeconds })
                .where(eq(stats.discord_id, params.discordId));
        }
    } catch (error) {
        console.error("Failed to add credits", {
            discordId: params.discordId,
            amount: params.amount,
            error,
        });
        throw error;
    }

}
async function useCredits(params: { discordId: string; amount: number }): Promise<void> {
    try {
        const currentCredits = await creditsRemaining({ discordId: params.discordId });
        const newAmount = currentCredits - params.amount;

        await db.update(credits)
            .set({ amount: newAmount })
            .where(eq(credits.discord_id, params.discordId));

        const totalSecondsUsed = await db.select({
            totalSecondsUsed: stats.totalSecondsUsed
        }).from(stats).where(eq(stats.discord_id, params.discordId)).limit(1);


        if (totalSecondsUsed[0]) {
            const newSeconds = totalSecondsUsed[0].totalSecondsUsed + params.amount;
            await db.update(stats)
                .set({ totalSecondsUsed: newSeconds })
                .where(eq(stats.discord_id, params.discordId));
        }
    } catch (error) {
        console.error("Failed to use credits", {
            discordId: params.discordId,
            amount: params.amount,
            error,
        });
        throw error;
    }
}

export { enoughCredits, creditsRemaining, addCredits, useCredits };