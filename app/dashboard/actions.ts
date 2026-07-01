"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createCheckoutSession } from "@/lib/checkout";
import { HOUR_PACKS } from "../data/prices";
import type { HourPackId } from "../data/prices";

const HOUR_PACK_IDS = new Set(HOUR_PACKS.map((pack) => pack.id));

export async function startCheckout(formData: FormData) {
  const activeSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!activeSession) {
    redirect("/login");
  }

  const packIdValue = formData.get("packId");

  if (typeof packIdValue !== "string") {
    throw new Error("Invalid hour pack");
  }

  const parsedPackId = Number(packIdValue);

  if (!Number.isInteger(parsedPackId)) {
    throw new Error("Invalid hour pack");
  }

  if (!HOUR_PACK_IDS.has(parsedPackId as HourPackId)) {
    throw new Error("Invalid hour pack");
  }

  const checkoutSession = await createCheckoutSession({
    discordId: activeSession.user.discordId,
    packId: parsedPackId as HourPackId,
  });

  if (!checkoutSession.url) {
    throw new Error("Unable to create checkout session");
  }

  redirect(checkoutSession.url);
}
