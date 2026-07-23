import Link from "next/link";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { getBillingHistoryLink } from "@/lib/billing";

  
export async function DashboardHero() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const billingLink = await getBillingHistoryLink(
    session?.user?.id,
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
  );

  return (
    <section className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em]">
            Transcription
          </Badge>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl">
            Manage your transcription balance
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Buy hour packs in one tap and keep track of your transcription time down to the second.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 w-full sm:w-auto")}>Home</Link>
          <Link href={billingLink} className={cn(buttonVariants({ size: "lg" }), "h-11 w-full sm:w-auto")}>
            View Billing History
          </Link>
        </div>
      </div>
    </section>
  );
}
