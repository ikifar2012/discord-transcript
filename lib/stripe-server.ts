import { Stripe } from "stripe";

async function getStripeServer() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2026-05-27.dahlia",

    });
    return stripe;
}
export default getStripeServer;