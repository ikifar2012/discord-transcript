"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AccountMenu } from "../components/account-menu";

const includedMinutes = 180;
const usedMinutes = 0;
const remainingMinutes = includedMinutes - usedMinutes;
const hourPacks = [
  ["3 hours", "$3", "A few long voice memos"],
  ["10 hours", "$9", "More voice memos"],
  ["30 hours", "$24", "Regular audio-heavy teams"],
];

export function DashboardClient() {
  const { data: session, isPending } = authClient.useSession();
  const displayName = session?.user?.name || session?.user?.email || "Discord user";
  const avatarUrl = session?.user?.image || null;
  const percentUsed = Math.round((usedMinutes / includedMinutes) * 100);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="hidden border-r border-border bg-card/35 px-4 py-5 lg:flex lg:flex-col">
          <Link href="/" className="flex items-center gap-3 px-2" aria-label="Discord Tools home">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">DT</span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.08em] text-foreground/85">DISCORD TOOLS</span>
              <span className="block text-xs text-muted-foreground">by Matheson</span>
            </span>
          </Link>

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
                <UserAvatar name={displayName} image={avatarUrl} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{displayName}</p>
                  <p className="text-sm text-muted-foreground">Discord account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <section className="min-w-0 px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex h-12 items-center justify-between border-b border-border pb-5 lg:border-none lg:pb-0">
            <Link href="/" className="flex items-center gap-3 lg:hidden" aria-label="Discord Tools home">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">DT</span>
              <span className="text-sm font-semibold tracking-[0.08em] text-foreground/85">DISCORD TOOLS</span>
            </Link>
            <p className="hidden text-sm font-medium text-muted-foreground lg:block">Discord Tools by Matheson</p>
            <div className="flex items-center gap-3">
              <AccountMenu />
            </div>
          </header>

          <div className="mx-auto max-w-6xl py-8 lg:py-10">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <Badge variant="secondary" className="rounded-lg">Transcription</Badge>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
                  {isPending ? "Checking your session" : "Manage transcription hours"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  Buy transcription hours for your Discord voice memos and track the minutes used by your account.
                </p>
              </div>
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "h-10")}>Manage account</Link>
            </div>

            <Card className="mt-7 rounded-lg bg-card/95">
              <CardContent>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Minutes used</p>
                    <div className="mt-3 flex items-baseline gap-3">
                      <p className="text-5xl font-semibold tracking-[-0.04em]">{usedMinutes}</p>
                      <p className="text-sm font-medium text-muted-foreground">of {includedMinutes} minutes</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {remainingMinutes} minutes available. Usage will update here as your voice memos are transcribed.
                    </p>
                  </div>
                  <div className="w-full lg:max-w-sm">
                    <Progress value={percentUsed} className="gap-2" />
                    <div className="mt-3 flex justify-between text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      <span>0m</span>
                      <span>{includedMinutes}m</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_340px]">
              <Card className="rounded-lg bg-card/95">
                <CardHeader>
                  <CardTitle>Purchase hours</CardTitle>
                  <CardDescription>Add transcription time to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-3">
                    {hourPacks.map(([hours, price, detail]) => (
                      <button
                        key={hours}
                        type="button"
                        className="rounded-lg bg-muted/45 p-4 text-left ring-1 ring-border transition hover:bg-muted"
                      >
                        <p className="text-sm font-medium text-muted-foreground">{hours}</p>
                        <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{price}</p>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-lg bg-card/95">
                <CardHeader>
                  <CardTitle>Bot setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Step done title="Discord sign-in" text="OAuth callback is working locally." />
                    <Separator />
                    <Step title="Use the bot" text="Open Discord Tools by Matheson from Discord." />
                    <Separator />
                    <Step title="Purchase hours" text="Choose an hour pack to enable paid transcription." />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function UserAvatar({ name, image, small = false }: { name: string; image: string | null; small?: boolean }) {
  const initial = name.slice(0, 1).toUpperCase();

  return (
    <Avatar size={small ? "sm" : "lg"}>
      {image ? <AvatarImage src={image} alt={name} /> : null}
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
}

function Step({ title, text, done = false }: { title: string; text: string; done?: boolean }) {
  return (
    <div className="flex gap-3">
      <Badge variant={done ? "default" : "secondary"} className="mt-0.5 size-5 rounded-full p-0 text-[10px]">
        {done ? "✓" : ""}
      </Badge>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
