import { db } from "@/db";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import getStripeServer from "./stripe-server";
async function getBillingHistoryLink(id: string | undefined, returnUrl: string): Promise<string> {
    if (!id) {
        return returnUrl;
    }

    const stripeCustomerId = await getStripeCustomerId(id);
    if (!stripeCustomerId) {
        return returnUrl;
    }

    try {
        const stripe = await getStripeServer();
        const billingHistory = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: returnUrl,
        });

        return billingHistory.url;
    } catch (error) {
        // If a customer was deleted or is otherwise invalid in Stripe, keep dashboard usable.
        console.warn("Failed to create billing portal session", {
            userId: id,
            stripeCustomerId,
            error,
        });
        return returnUrl;
    }
}
async function getStripeCustomerId(id: string): Promise<string | undefined> {
    const result = await db.select({
        stripeCustomerId: user.stripeCustomerId
    }).from(user).where(eq(user.id, id)).limit(1);
    if (result.length === 0) {
        throw new Error(`No user found with id: ${id}`);
    }
    else {
    return result[0].stripeCustomerId ?? undefined;
    }
}
export { getBillingHistoryLink, getStripeCustomerId };