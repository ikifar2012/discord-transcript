import { account } from "@/auth-schema"
import { db } from "@/db";
import { eq } from "drizzle-orm";

export default async function getDiscordIdFromUserId(userId: string): Promise<string> {
    const lookup = await db
        .select()
        .from(account)
        .where(eq(account.userId, userId))
        .limit(1);

    const userAccount = lookup[0];
    if (!userAccount) {
        console.log(lookup)
        throw new Error(`No Discord ID found for user ID: ${userId}`);
    }
    return userAccount.accountId;
}
