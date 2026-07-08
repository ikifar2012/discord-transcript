import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountMenu } from "./account-menu";
import { BrandMark } from "./brand-mark";

async function AccountArea() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user
    ? {
        name: session.user.name || session.user.email || "Discord user",
        image: session.user.image ?? null,
      }
    : null;

  return <AccountMenu user={user} />;
}

export function SiteHeader() {
  return (
    <header className="rounded-3xl border border-white/15 bg-card/45 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <BrandMark />
        <nav className="flex items-center gap-2" aria-label="Primary navigation">
          <Link href="/" className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted/50 hover:text-foreground sm:inline-flex">
            Home
          </Link>
          <Link href="/dashboard" className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted/50 hover:text-foreground sm:inline-flex">
            Dashboard
          </Link>
          <Suspense fallback={<Skeleton className="size-8 rounded-full" aria-label="Checking account" />}>
            <AccountArea />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
