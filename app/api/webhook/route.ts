// Partial of app/api/webhooks/route.ts
import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { addCredits } from "@/lib/credits";
import { getOrderStatus } from "@/lib/checkout";
import { completeCheckout } from "@/lib/workflows/complete-checkout";
import { start } from "workflow/api";
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
      if (event.data.object.payment_status !== "unpaid") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const packId = session.metadata?.packId;
        const discordId = session.metadata?.discordId;
        if (!orderId || !packId || !discordId) {
          console.log("Missing metadata in the session object");
          return NextResponse.json(
            { message: "Missing metadata in the session object" },
            { status: 400 },
          );
        }
        if (await getOrderStatus(orderId) === "completed") {
          console.log(`Order ${orderId} has already been completed`);
          return NextResponse.json(
            { message: `Order ${orderId} has already been completed` },
            { status: 200 },
          );
        }
        else {
          const job = await start(completeCheckout, [discordId, packId, orderId]);
          console.log(`Started workflow job ${job.runId} for order ${orderId}`);
          return NextResponse.json(
            { message: `Checkout completed for order ${orderId}` },
            { status: 200 },
          );
        }

      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}