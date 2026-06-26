import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Stripe } from "stripe";
import { db } from "./db";
import { createAuthMiddleware } from "better-auth/api";
import { credits } from "./db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const stripePlugin =
  process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET
    ? stripe({
        stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: "2026-05-27.dahlia",
        }),
        stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        createCustomerOnSignUp: true,
      })
    : null;

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
      const session = ctx.context.newSession?.session;
      if (session) {
        // does user already have credits? if not, add 30 credits
        const existingCredits = await db
          .select()
          .from(credits)
          .where(eq(credits.userId, session.userId))
          .limit(1);
        if (existingCredits.length === 0) {
          await db.insert(credits).values({
            id: randomUUID(),
            userId: session.userId,
            amount: 30,
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
  plugins: stripePlugin ? [stripePlugin] : [],
});
