import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { credits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DashboardHero } from "./_components/dashboard-hero";
import { DashboardShell } from "./_components/dashboard-shell";
import { HOUR_PACKS, SETUP_STEPS } from "./_components/dashboard-data";
import { PurchaseHoursCard } from "./_components/purchase-hours-card";
import { SetupCard } from "./_components/setup-card";
import { UsageCard } from "./_components/usage-card";
import { UsageCardSkeleton } from "./_components/usage-card-skeleton";

async function UserCreditsSection({ userId }: { userId: string }) {
  // Fetch user's credits from database
  const userCredits = await db
    .select()
    .from(credits)
    .where(eq(credits.userId, userId))
    .limit(1);

  const creditData = userCredits[0];
  const includedMinutes = creditData?.amount || 0;
  const usedMinutes = creditData?.used || 0;

  return (
    <UsageCard
      includedMinutes={includedMinutes}
      usedMinutes={usedMinutes}
    />
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = {
    name: session.user?.name || session.user?.email || "Discord user",
    image: session.user?.image || null,
  };

  return (
    <DashboardShell user={user}>
      <DashboardHero />
      <Suspense fallback={<UsageCardSkeleton />}>
        <UserCreditsSection userId={session.user.id} />
      </Suspense>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_340px]">
        <PurchaseHoursCard hourPacks={HOUR_PACKS} />
        <SetupCard steps={SETUP_STEPS} />
      </div>
    </DashboardShell>
  );
}
