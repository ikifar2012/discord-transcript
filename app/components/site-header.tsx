import Link from "next/link";
import { AccountMenu } from "./account-menu";
import { BrandMark } from "./brand-mark";

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
          <AccountMenu />
        </nav>
      </div>
    </header>
  );
}
