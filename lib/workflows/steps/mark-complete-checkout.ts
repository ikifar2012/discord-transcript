import { updateOrderStatus } from "@/lib/checkout";

export async function markCompleteOrder(orderId: string) {
    'use step'
    await updateOrderStatus(orderId, "completed");
}