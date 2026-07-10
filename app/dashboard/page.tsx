import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { credits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getFreeTranscriptionsRemaining } from "@/lib/credits";
import { Reveal } from "../components/reveal";
import { DashboardHero } from "./_components/dashboard-hero";
import { DeleteAccountCard } from "./_components/delete-account-card";
import { DashboardShell } from "./_components/dashboard-shell";
import { PurchaseHoursCard } from "./_components/purchase-hours-card";
import { UsageCard } from "./_components/usage-card";
import { UsageCardSkeleton } from "./_components/usage-card-skeleton";
import { HOUR_PACKS } from "../data/prices";
import { startCheckout } from "./actions";

async function UserCreditsSection({ discordId }: { discordId: string }) {
  // Fetch user's credits from database
  const userCredits = await db
    .select()
    .from(credits)
    .where(eq(credits.discord_id, discordId))
    .limit(1);

  const creditData = userCredits[0];
  const includedMinutes = creditData?.amount / 60 || 0; // Convert seconds to minutes
  const usedMinutes = creditData?.used / 60 || 0; // Convert seconds to minutes
  const freeTranscriptionsRemaining = await getFreeTranscriptionsRemaining(discordId);

  return (
    <Reveal>
      <UsageCard
        includedMinutes={includedMinutes}
        usedMinutes={usedMinutes}
        freeTranscriptionsRemaining={freeTranscriptionsRemaining}
      />
    </Reveal>
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <Reveal>
          <DashboardHero />
        </Reveal>
        <Suspense fallback={<UsageCardSkeleton />}>
          <UserCreditsSection discordId={session.user.discordId} />
        </Suspense>
        <Reveal delay={0.15}>
          <PurchaseHoursCard hourPacks={HOUR_PACKS} checkoutAction={startCheckout} />
        </Reveal>
        <Reveal delay={0.2}>
          <DeleteAccountCard />
        </Reveal>
      </div>
    </DashboardShell>
  );
}
