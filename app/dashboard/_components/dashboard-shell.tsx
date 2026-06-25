import { AccountMenu } from "@/app/components/account-menu";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { BrandMark } from "@/app/components/brand-mark";
import { type DashboardUser, UserAvatar } from "./user-avatar";

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: DashboardUser;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <DashboardSidebar user={user} />
        <section className="min-w-0 px-5 py-5 sm:px-8 lg:px-10">
          <DashboardHeader />
          <div className="mx-auto max-w-6xl py-8 lg:py-10">{children}</div>
        </section>
      </div>
    </main>
  );
}

function DashboardSidebar({ user }: { user: DashboardUser }) {
  return (
    <aside className="hidden border-r border-border bg-card/35 px-4 py-5 lg:flex lg:flex-col">
      <div className="px-2">
        <BrandMark />
      </div>

      <nav className="mt-8">
        <div className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
          Transcription
        </div>
      </nav>

      <Card className="mt-auto rounded-lg bg-card/70" size="sm">
        <CardHeader>
          <CardDescription>Account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <UserAvatar user={user} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">Discord account</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function DashboardHeader() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border pb-5 lg:border-none lg:pb-0">
      <div className="lg:hidden">
        <BrandMark compact />
      </div>
      <p className="hidden text-sm font-medium text-muted-foreground lg:block">
        Discord Tools by Matheson
      </p>
      <AccountMenu />
    </header>
  );
}
