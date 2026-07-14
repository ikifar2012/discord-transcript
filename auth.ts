import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Stripe } from "stripe";
import { db } from "./db";
import { createAuthMiddleware } from "better-auth/api";
import { credits, orders } from "./db/schema";
import { eq } from "drizzle-orm";
import { customSession } from "better-auth/plugins";
import getDiscordIdFromUserId from "./lib/get-discord-id";



export const auth = betterAuth({
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      scope: ["identify", "email", "applications.commands"],
      
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Discord's authorize URL needs integration_type=1 (user install) so the
      // app gets linked to the user's account, but better-auth's Discord
      // provider has no option for it — patch the returned URL instead.
      const returned = ctx.context.returned as
        | { url?: string; redirect?: boolean }
        | undefined;
      if (returned?.url?.startsWith("https://discord.com/api/oauth2/authorize")) {
        const url = `${returned.url}&integration_type=1`;
        ctx.setHeader("Location", url);
        return { ...returned, url };
      }
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
            amount: 0, // 0 credits on signup
            used: 0,
          });
        }
      }
    }),
  },
  user: {
    deleteUser: {
      enabled: true,
      // Removes PII only: the user row (name, email, avatar) plus cascading
      // sessions and OAuth accounts. Local order rows must go first because
      // their FK has no cascade; Stripe keeps the authoritative billing
      // records. Credits and stats stay keyed to the Discord ID so deleting
      // an account can't reset the balance or free transcriptions.
      beforeDelete: async (user) => {
        await db.delete(orders).where(eq(orders.user_id, user.id));
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [
    stripe({
      stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-06-24.dahlia",
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
