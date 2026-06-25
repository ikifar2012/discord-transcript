import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function MarketingShell({
  children,
  showDashboardLink = true,
}: {
  children: React.ReactNode;
  showDashboardLink?: boolean;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8">
        <SiteHeader showDashboardLink={showDashboardLink} />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </div>
    </main>
  );
}
