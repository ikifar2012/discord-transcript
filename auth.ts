import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Stripe } from "stripe";
import { db } from "./db";

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
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  url: process.env.BETTER_AUTH_URL,
  plugins: stripePlugin ? [stripePlugin] : [],
});
