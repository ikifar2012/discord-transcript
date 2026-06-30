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
    session?.user?.id as string,
    `${process.env.BETTER_AUTH_URL}/dashboard`
  );

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <Badge variant="secondary" className="rounded-lg">
          Transcription
        </Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Manage transcription hours
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          Buy transcription hours for your Discord voice memos and track the minutes used by your account.
        </p>
      </div>
      <Link href={billingLink} className={cn(buttonVariants({ size: "lg" }), "h-10")}>
        View Billing History
      </Link>
    </div>
  );
}
