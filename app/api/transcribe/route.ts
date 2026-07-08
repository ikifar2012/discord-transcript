import { hasAccount, enoughCredits, useCredits as chargeCredits } from "@/lib/credits";
import transcribe from "@/lib/groq";

// Discord attachment hosts the bot is allowed to pass through to Groq
const ALLOWED_AUDIO_HOSTS = new Set(["cdn.discordapp.com", "media.discordapp.net"]);

// Groq bills audio at a minimum of 10s per request
const MIN_BILLABLE_SECONDS = 10;

export async function POST(req: Request) {
    // check api key
    const apiKey = req.headers.get("Authorization")?.split(" ")[1];
    if (!process.env.TRANSCRIBE_API_KEY || apiKey !== process.env.TRANSCRIBE_API_KEY) {
        return new Response("Unauthorized", { status: 401 });
    }

    let body: { discordId?: unknown; url?: unknown; durationSeconds?: unknown };
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { discordId, url, durationSeconds } = body;
    if (typeof discordId !== "string" || discordId.length === 0) {
        return Response.json({ error: "discordId is required" }, { status: 400 });
    }
    if (typeof url !== "string") {
        return Response.json({ error: "url is required" }, { status: 400 });
    }

    let audioUrl: URL;
    try {
        audioUrl = new URL(url);
    } catch {
        return Response.json({ error: "url is not a valid URL" }, { status: 400 });
    }
    if (audioUrl.protocol !== "https:" || !ALLOWED_AUDIO_HOSTS.has(audioUrl.hostname)) {
        return Response.json({ error: "url must be a Discord attachment URL" }, { status: 400 });
    }

    // Required so the balance check below reflects the real cost before we transcribe
    if (typeof durationSeconds !== "number" || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
        return Response.json({ error: "durationSeconds is required and must be a positive number" }, { status: 400 });
    }

    const estimatedSeconds = Math.max(MIN_BILLABLE_SECONDS, Math.ceil(durationSeconds));

    try {
        // Credits rows are only created on web signup — first-time users
        // must log in via the website before the bot can transcribe for them.
        if (!(await hasAccount(discordId))) {
            const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`;
            return Response.json(
                { error: `No account found. Sign in at ${loginUrl} first.`, loginUrl },
                { status: 403 }
            );
        }

        const hasCredits = await enoughCredits({ discordId, amount: estimatedSeconds });
        if (!hasCredits) {
            return Response.json({ error: "Insufficient credits" }, { status: 402 });
        }

        const result = await transcribe(audioUrl.toString());

        const secondsCharged = Math.max(MIN_BILLABLE_SECONDS, Math.ceil(result.duration ?? durationSeconds));
        await chargeCredits({ discordId, amount: secondsCharged });

        return Response.json({ text: result.text, secondsCharged });
    } catch (error) {
        console.error("Transcription request failed", { discordId, error });
        return Response.json({ error: "Transcription failed" }, { status: 502 });
    }
}
