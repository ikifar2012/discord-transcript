// Partial of app/api/webhooks/route.ts
import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { addCredits } from "@/lib/credits";
export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  console.log("✅ Success:", event.id);
// Handle the event
// add credit to the user account based on the event type
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`💰 PaymentIntent was successful! ${paymentIntent.id}`)
            if (paymentIntent.metadata.discordId && paymentIntent.amount) {
                const amount = paymentIntent.amount
                console.log(`Adding ${amount} credits to user ${discordId}`);
                await addCredits({ discordId, amount });
            }
        break;
        default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }