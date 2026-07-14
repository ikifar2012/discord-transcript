# Transcribe for Discord

Turn Discord voice messages into text. Users sign in with Discord, get their first 5 transcriptions free, then prepay for hours of audio (no subscription). A companion Discord bot calls this app's API to transcribe voice memos and post the text back in chat.

This repository contains the web app: the marketing site, the user dashboard, the billing flow, and the bot-facing transcription API.

## How it works

1. A user signs in on the site with Discord. The OAuth flow uses `integration_type=1` (user install), so the app links to their Discord account rather than a server.
2. Signing up creates a credit balance keyed to their Discord ID: 5 free transcriptions plus a starting balance.
3. The Discord bot receives a voice message and calls `POST /api/transcribe` with the user's Discord ID, the attachment URL, and its duration.
4. The app checks the balance, transcribes the audio with Groq Whisper (`whisper-large-v3-turbo`), charges the actual audio duration in seconds (minimum 10 seconds per request), and returns the text.
5. Users buy more time on the dashboard: $2 for 1 hour, $5 for 5 hours, or $9 for 10 hours, paid through Stripe Checkout. A Stripe webhook plus a durable workflow credit the purchase.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript |
| Auth | [Better Auth](https://better-auth.com) with the Discord social provider and Stripe plugin |
| Database | PostgreSQL via [Drizzle ORM](https://orm.drizzle.team) |
| Payments | Stripe Checkout + webhooks |
| Transcription | [Groq](https://groq.com) Whisper (`whisper-large-v3-turbo`) |
| Background jobs | [`workflow`](https://www.npmjs.com/package/workflow) durable functions (checkout completion) |
| Styling | Tailwind CSS 4, shadcn/Base UI components, Motion |
| Runtime tooling | [Bun](https://bun.sh) |

## Getting started

### Prerequisites

- Bun
- A PostgreSQL database
- A [Discord application](https://discord.com/developers/applications) with OAuth2 set up (redirect URL: `{BETTER_AUTH_URL}/api/auth/callback/discord`)
- A Groq API key
- A Stripe account (secret key, publishable key, and a webhook signing secret)

### Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Copy `.env.example` to `.env` and fill it in. The full set of variables the app reads:

   | Variable | Purpose |
   | --- | --- |
   | `DATABASE_URL` | PostgreSQL connection string |
   | `BETTER_AUTH_SECRET` | Secret for signing auth tokens |
   | `BETTER_AUTH_URL` | Public base URL of the app (`http://localhost:3000` in dev) |
   | `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | Discord OAuth credentials |
   | `GROQ_API_TOKEN` | Groq API key for Whisper transcription |
   | `TRANSCRIBE_API_KEY` | Shared secret the Discord bot sends to `/api/transcribe` |
   | `STRIPE_SECRET_KEY` | Stripe server-side key |
   | `STRIPE_WEBHOOK_SECRET` | Signing secret for the Stripe webhook endpoint |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client-side key |
   | `NEXT_PUBLIC_APP_URL` | Public app URL used in client code |

3. Push the schema to your database (or run migrations):

   ```bash
   bun run db:push
   ```

4. Start the dev server:

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

5. For payments in development, forward Stripe webhooks locally:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

## Scripts

| Command | What it does |
| --- | --- |
| `bun dev` | Start the Next.js dev server |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run ESLint |
| `bun run db:generate` | Generate Drizzle migrations from the schema |
| `bun run db:migrate` | Apply migrations |
| `bun run db:push` | Push the schema directly to the database |
| `bun run db:studio` | Open Drizzle Studio |

## API

### `POST /api/transcribe`

Bot-facing endpoint. Authenticated with `Authorization: Bearer <TRANSCRIBE_API_KEY>`. Takes a Discord user ID, a `cdn.discordapp.com` / `media.discordapp.net` attachment URL, and the audio duration; returns the transcript and the seconds charged. Full request/response reference, billing rules, error codes, and a discord.js usage example live in [docs/transcribe-api.md](docs/transcribe-api.md).

### `POST /api/webhook`

Stripe webhook receiver. Verifies the signature, then starts a durable `completeCheckout` workflow that adds the purchased seconds to the user's balance and marks the order complete. Idempotent: already-completed orders are skipped.

### `/api/auth/[...all]`

Better Auth handler (Discord OAuth, sessions, account deletion, Stripe customer creation).

## Billing model

- Credits are stored in seconds, keyed to the user's **Discord ID** (not the auth user ID), in the `credits` table.
- New accounts start with 5 free transcriptions and a 900-second (15 minute) starting balance.
- Each request is billed at a minimum of 10 seconds (Groq's minimum), rounded up to whole seconds. Free transcriptions cover a whole memo regardless of length.
- Purchases are prepaid hour packs defined in [app/data/prices.ts](app/data/prices.ts). No subscriptions.
- Account deletion removes PII (the auth user, sessions, OAuth accounts, local order rows) but keeps credits and stats keyed to the Discord ID, so deleting and re-creating an account cannot reset a balance or refresh free transcriptions. Stripe remains the authoritative billing record.

## Project structure

```
app/
  page.tsx               Marketing landing page
  login/                 Discord sign-in
  dashboard/             Usage, balance, and hour-pack purchase UI
  privacy/, terms/       Legal pages (content in app/data/legal.ts)
  api/transcribe/        Bot-facing transcription endpoint
  api/webhook/           Stripe webhook handler
  api/auth/[...all]/     Better Auth routes
  data/                  Marketing copy, FAQ, prices, legal text
auth.ts                  Better Auth config (Discord provider, Stripe plugin, signup hook)
auth-schema.ts           Better Auth database tables
db/                      Drizzle client, app schema (credits, stats, orders), reset script
lib/
  groq.ts                Whisper transcription client
  credits.ts, billing.ts Balance checks and charging
  checkout.ts, pack.ts   Stripe Checkout session creation and pack lookup
  workflows/             Durable checkout-completion workflow and its steps
components/ui/           shadcn/Base UI primitives
docs/transcribe-api.md   Bot integration guide
drizzle/                 Generated migrations
```

## Deployment

Pushes to `main` trigger a GitHub Actions workflow ([.github/workflows/docker-publish.yml](.github/workflows/docker-publish.yml)) that builds a Docker image from the repository's `Dockerfile` and publishes it to GitHub Container Registry (`ghcr.io`).

Run the container with the environment variables above, a reachable PostgreSQL instance, and your Stripe webhook endpoint pointed at `{BETTER_AUTH_URL}/api/webhook`.

## Note for contributors

This project pins a Next.js version with breaking changes from older releases. Check the guides in `node_modules/next/dist/docs/` before assuming an API works the way it used to, and use `bun` (never `npm install`) for dependency management.

## Contact

Questions or issues: [contact@mathesonsteplock.ca](mailto:contact@mathesonsteplock.ca)
