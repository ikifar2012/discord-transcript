import getStripeServer from "./stripe-server";
import { HOUR_PACKS } from "@/app/data/prices";
import type { HourPackId } from "@/app/data/prices";

const HOUR_PACKS_BY_ID = new Map(HOUR_PACKS.map((pack) => [pack.id, pack]));

export async function createCheckoutSession(params: { discordId: string; packId: HourPackId }) {
    const pack = HOUR_PACKS_BY_ID.get(params.packId);

    if (!pack) {
        throw new Error("Invalid hour pack ID");
    }

    const stripe = await getStripeServer();
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
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
            discordId: params.discordId,
            packId: String(pack.id),
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return session;
}