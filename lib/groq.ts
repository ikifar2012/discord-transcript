import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_TOKEN });

export type TranscriptionResult = {
    text: string;
    /** Audio duration in seconds, when reported by the API */
    duration: number | null;
};

export default async function transcribe(fileurl: string): Promise<TranscriptionResult> {
    try {
        const transcription = await groq.audio.transcriptions.create({
            url: fileurl,
            model: "whisper-large-v3-turbo",
            temperature: 0,
            response_format: "verbose_json",
        });
        const duration = (transcription as { duration?: number }).duration;
        return {
            text: transcription.text,
            duration: typeof duration === "number" ? duration : null,
        };
    } catch (error) {
        console.error("Error during transcription:", error);
        throw error;
    }
}
