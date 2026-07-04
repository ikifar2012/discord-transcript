import { addCredits } from "@/lib/credits";
import { getSecondsFromPack } from "@/lib/pack";

export async function checkoutAddCredits(discordId: string, packId: string) {
    'use step'
    const secondsToAdd = await getSecondsFromPack(packId);
    await addCredits({ discordId, amount: secondsToAdd });
}