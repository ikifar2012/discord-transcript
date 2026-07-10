import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFreeTranscriptionsRemaining } from "@/lib/credits";

const ctaClassName = cn(buttonVariants({ size: "lg" }), "h-11 sm:w-auto");

export function HeroCtaFallback() {
  return <span className={ctaClassName}>Try 5 messages free</span>;
}

export async function HeroCta() {
  let label = "Try 5 messages free";

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user) {
      const remaining = await getFreeTranscriptionsRemaining(session.user.discordId);
      label =
        remaining > 0
          ? `${remaining} free ${remaining === 1 ? "message" : "messages"} left`
          : "Open dashboard";
    }
  } catch {
    // If the session or credits lookup fails, fall back to the signed-out CTA.
  }

  return (
    <Link href="/dashboard" className={ctaClassName}>
      {label}
    </Link>
  );
}
