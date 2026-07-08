async function POST(req: Request) {
    // check api key
    const apiKey = req.headers.get("Authorization")?.split(" ")[1];
    if (apiKey !== process.env.TRANSCRIBE_API_KEY) {
        return new Response("Unauthorized", { status: 401 });
    }
    
    
}