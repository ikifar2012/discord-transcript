
import Groq from "groq-sdk";

const groq = new Groq();
export default async function transcribe(fileurl: string) {
    try {
    const transcription = await groq.audio.transcriptions.create({
        url: fileurl,
        model: "whisper-large-v3-turbo",
        temperature: 0,
        response_format: "verbose_json",
    });
    return transcription.text;
}
catch (error) {
    console.error("Error during transcription:", error);
}
}
