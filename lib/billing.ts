import { db } from "@/db";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import getStripeServer from "./stripe-server";
async function getBillingHistoryLink(id: string, returnUrl: string): Promise<string> {

    const stripe = await getStripeServer();
    const stripeCustomerId = await getStripeCustomerId(id);
    const billingHistory = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: returnUrl,
        
    });
    const billingHistorylink = billingHistory.url;

  return billingHistorylink;
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