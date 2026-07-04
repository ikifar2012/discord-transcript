import { checkoutAddCredits } from "./steps/add-credits";
import { markCompleteOrder } from "./steps/mark-complete-checkout";

export async function completeCheckout(discordId: string, packId: string, orderId: string) {
    'use workflow'
    await checkoutAddCredits(discordId, packId);
    await markCompleteOrder(orderId);
    return { message: `Checkout completed for order ${orderId}` };
}