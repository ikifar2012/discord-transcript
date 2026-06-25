import Link from "next/link";
import { AccountMenu } from "./account-menu";
import { BrandMark } from "./brand-mark";

export function SiteHeader({ showDashboardLink = true }: { showDashboardLink?: boolean }) {
  return (
    <header className="flex h-12 items-center justify-between">
      <BrandMark />
      <nav className="flex items-center gap-4" aria-label="Primary navigation">
        {showDashboardLink ? (
          <Link
            href="/dashboard"
            className="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground sm:inline-flex"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Home
          </Link>
        )}
        {showDashboardLink ? <AccountMenu /> : null}
      </nav>
    </header>
  );
}
