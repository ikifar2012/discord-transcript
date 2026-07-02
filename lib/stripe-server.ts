import { Stripe } from "stripe";

async function getStripeServer() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2026-06-24.dahlia",

    });
    return stripe;
}
export default getStripeServer;