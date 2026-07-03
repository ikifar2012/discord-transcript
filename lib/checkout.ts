import getStripeServer from "./stripe-server";
import { HOUR_PACKS } from "@/app/data/prices";
import type { HourPackId } from "@/app/data/prices";
import { getStripeCustomerId } from "./billing";
import { db, orders } from "@/db";

const HOUR_PACKS_BY_ID = new Map(HOUR_PACKS.map((pack) => [pack.id, pack]));

export async function createCheckoutSession(params: { userId: string; discordId: string; packId: HourPackId }) {
    const pack = HOUR_PACKS_BY_ID.get(params.packId);
    const orderId = await generateOrderId(params.userId, params.packId, "pending");
    if (!pack) {
        throw new Error("Invalid hour pack ID");
    }

    const stripe = await getStripeServer();
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: await getStripeCustomerId(params.userId),

        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Discord Transcript Credits (${pack.hours})`,
                    },
                    unit_amount: pack.priceincents,
                },
                quantity: 1,
            },
        ],
        metadata: {
            userId: params.userId,
            orderId: orderId,
            discordId: params.discordId,
            packId: String(pack.id),
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        
    });

    return session;
}
export type orderStatus = "pending" | "completed" | "failed";

export async function generateOrderId(userId: string, packId: HourPackId, orderStatus: orderStatus): Promise<string> {
    const orderId = crypto.randomUUID();

    await db.insert(orders).values({
        order_id: orderId,
        user_id: userId,
        pack_id: String(packId),
        order_status: orderStatus,
    });

    return orderId;
    
}