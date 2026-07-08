import { credits, db, stats } from "@/db";
import { eq } from "drizzle-orm";

const FREE_TRANSCRIPTIONS_TOTAL = 5;

async function getFreeTranscriptionsRemaining(discordId: string): Promise<number> {
    try {
        const result = await db.select({
            freeTranscriptionsUsed: credits.freeTranscriptionsUsed,
        }).from(credits).where(eq(credits.discord_id, discordId)).limit(1);

        if (result.length === 0) return FREE_TRANSCRIPTIONS_TOTAL;
        
        return Math.max(0, FREE_TRANSCRIPTIONS_TOTAL - result[0].freeTranscriptionsUsed);
    } catch (error) {
        console.error("Failed to get free transcriptions remaining", { discordId, error });
        throw error;
    }
}

async function hasAccount(discordId: string): Promise<boolean> {
    try {
        const result = await db.select({
            discord_id: credits.discord_id,
        }).from(credits).where(eq(credits.discord_id, discordId)).limit(1);

        return result.length > 0;
    } catch (error) {
        console.error("Failed to check account", { discordId, error });
        throw error;
    }
}

async function enoughCredits(params: { discordId: string; amount: number }): Promise<boolean> {
    try {
        const freeRemaining = await getFreeTranscriptionsRemaining(params.discordId);
        
        // If they have free transcriptions available, they can proceed
        if (freeRemaining > 0) {
            return true;
        }

        // Otherwise, check paid credits
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
        // Get current state
        const result = await db.select({
            amount: credits.amount,
            freeTranscriptionsUsed: credits.freeTranscriptionsUsed,
        }).from(credits).where(eq(credits.discord_id, params.discordId)).limit(1);

        if (result.length === 0) {
            throw new Error(`No credits record found for user: ${params.discordId}`);
        }

        const { amount: currentCredits, freeTranscriptionsUsed } = result[0];
        const freeRemaining = Math.max(0, FREE_TRANSCRIPTIONS_TOTAL - freeTranscriptionsUsed);

        // Determine if we use free transcription or paid credits
        let newAmount = currentCredits;
        let newFreeUsed = freeTranscriptionsUsed;

        if (freeRemaining > 0) {
            // Use free transcription
            newFreeUsed += 1;
        } else {
            // Use paid credits
            newAmount -= params.amount;
        }

        // Update database
        await db.update(credits)
            .set({ 
                amount: newAmount,
                freeTranscriptionsUsed: newFreeUsed,
            })
            .where(eq(credits.discord_id, params.discordId));

        // Update stats
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

export { hasAccount, enoughCredits, creditsRemaining, addCredits, useCredits, getFreeTranscriptionsRemaining };