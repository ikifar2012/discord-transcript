// Partial of app/api/webhooks/route.ts
import { Stripe } from "stripe";
import { NextResponse } from "next/server";
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
        case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session completed for session ID: ${session.id}`);
        // Add credit to the user account based on the session details
        
        break;
        default:
        console.log(`Unhandled event type: ${event.type}`);
    }   