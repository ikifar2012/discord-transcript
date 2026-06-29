import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Stripe } from "stripe";
import { db } from "./db";
import { createAuthMiddleware } from "better-auth/api";
import { credits } from "./db/schema";
import { eq } from "drizzle-orm";
import { customSession } from "better-auth/plugins";
import getDiscordIdFromUserId from "./lib/get-discord-id";



export const auth = betterAuth({
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Example: Add 30 credits to a new user after signup
      const session = ctx.context.newSession?.session.userId
      if (session) {
        const discordId = await getDiscordIdFromUserId(session);
        // does user already have credits? if not, add 30 credits
        const existingCredits = await db
          .select()
          .from(credits)
          .where(eq(credits.discord_id, discordId))
          .limit(1);
        if (existingCredits.length === 0) {
          await db.insert(credits).values({
            discord_id: discordId,
            amount: 900, // 15 minutes in seconds
            used: 0,
          });
        }
      }
    }),
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [
    stripe({
      stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-05-27.dahlia",
      }),
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
    }),
    customSession(async ({ user, session }) => {
      const discordId = await getDiscordIdFromUserId(user.id);
      return {
        user: {
          ...user,
          discordId: discordId,
        },
        session
      };
    }),

  ],

});
