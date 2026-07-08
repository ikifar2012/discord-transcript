# Transcribe API

Bot-facing endpoint for transcribing Discord voice memos.

```
POST {APP_URL}/api/transcribe
```

## Authentication

Every request must include the shared API key:

```
Authorization: Bearer <TRANSCRIBE_API_KEY>
Content-Type: application/json
```

## Request body

| Field             | Type   | Required | Notes                                                                                       |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------- |
| `discordId`       | string | yes      | The Discord user ID of the person who sent the voice memo.                                  |
| `url`             | string | yes      | The attachment URL. Must be `https` on `cdn.discordapp.com` or `media.discordapp.net`.      |
| `durationSeconds` | number | yes      | Audio length in seconds, > 0. Use the attachment's `duration_secs` from the Discord API.    |

Example:

```json
{
  "discordId": "189133605525592064",
  "url": "https://cdn.discordapp.com/attachments/123/456/voice-message.ogg",
  "durationSeconds": 12.4
}
```

## Success response — `200`

```json
{
  "text": "Hey, just wanted to follow up on the meeting notes...",
  "secondsCharged": 13
}
```

## Billing rules

- The user's balance is checked **before** transcription using `durationSeconds`.
- Audio is billed at a **minimum of 10 seconds** per request (Groq minimum), rounded up to whole seconds.
- If the user has free transcriptions remaining, one free slot is consumed instead of paid seconds — regardless of length.
- Otherwise the actual audio duration reported by the transcription API is charged (falling back to `durationSeconds`).

## Error responses

All errors return JSON `{ "error": string }` unless noted.

| Status | Meaning              | Body / notes                                                                                      |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------- |
| `401`  | Bad or missing key   | Plain-text `Unauthorized`. Check the `Authorization` header.                                       |
| `400`  | Invalid request      | Missing/invalid `discordId`, `url` (non-Discord or non-https), `durationSeconds` (≤ 0), or bad JSON. |
| `403`  | No account           | User has never signed in on the website. Body includes `loginUrl` — relay it so they can sign up: `{ "error": "No account found. Sign in at https://example.com/login first.", "loginUrl": "https://example.com/login" }` |
| `402`  | Insufficient credits | User's paid balance can't cover the memo and no free transcriptions remain. Suggest buying hours on the dashboard. |
| `502`  | Transcription failed | Groq or database error. Safe to retry once; nothing was charged if transcription itself failed.    |

## Bot usage example (discord.js)

```ts
async function transcribeVoiceMemo(message: Message) {
  const attachment = message.attachments.first();
  if (!attachment?.duration) return; // not a voice message

  const res = await fetch(`${process.env.APP_URL}/api/transcribe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TRANSCRIBE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      discordId: message.author.id,
      url: attachment.url,
      durationSeconds: attachment.duration,
    }),
  });

  const data = await res.json().catch(() => null);

  if (res.ok) {
    await message.reply(data.text);
  } else if (res.status === 403 && data?.loginUrl) {
    await message.reply(`You need an account first — sign in at ${data.loginUrl}`);
  } else if (res.status === 402) {
    await message.reply("You're out of transcription time. Buy more hours on the dashboard.");
  } else {
    await message.reply("Sorry, transcription failed. Try again in a moment.");
  }
}
```

> **Note:** in discord.js v14, voice-message attachments expose `attachment.duration` (seconds); on the raw API the field is `duration_secs`.
