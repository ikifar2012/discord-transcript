"use client";

import { authClient } from "@/lib/auth-client";
import { DashboardHero } from "./_components/dashboard-hero";
import { DashboardShell } from "./_components/dashboard-shell";
import { HOUR_PACKS, SETUP_STEPS, TRANSCRIPTION_USAGE } from "./_components/dashboard-data";
import { PurchaseHoursCard } from "./_components/purchase-hours-card";
import { SetupCard } from "./_components/setup-card";
import { UsageCard } from "./_components/usage-card";

export function DashboardClient() {
  const { data: session, isPending } = authClient.useSession();
  const user = {
    name: session?.user?.name || session?.user?.email || "Discord user",
    image: session?.user?.image || null,
  };

  return (
    <DashboardShell user={user}>
      <DashboardHero isPending={isPending} />
      <UsageCard
        includedMinutes={TRANSCRIPTION_USAGE.includedMinutes}
        usedMinutes={TRANSCRIPTION_USAGE.usedMinutes}
      />
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_340px]">
        <PurchaseHoursCard hourPacks={HOUR_PACKS} />
        <SetupCard steps={SETUP_STEPS} />
      </div>
    </DashboardShell>
  );
}
