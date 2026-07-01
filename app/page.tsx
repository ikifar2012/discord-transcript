import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarketingShell } from "./components/marketing-shell";
import { HOUR_PACKS } from "./data/prices";

export default function Home() {
  return (
    <MarketingShell>
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur sm:p-8">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em]">
              Discord Voice Transcription
            </Badge>

            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Turn every voice memo into searchable text.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Buy hours once, transcribe directly in Discord, and track usage in a clean dashboard.
            </p>

            <div className="mt-7">
              <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "h-11 sm:w-auto")}>
                Open dashboard
              </Link>
            </div>
          </div>

          <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <CardHeader>
              <CardTitle>Buy more hours</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-3 md:grid-cols-3">
              {HOUR_PACKS.map((pack, index) => (
                <Link
                  key={pack.id}
                  href="/dashboard"
                  className="group relative block overflow-hidden rounded-xl bg-muted/45 p-4 text-left ring-1 ring-border transition duration-200 hover:-translate-y-0.5 hover:bg-muted hover:ring-foreground/30 sm:p-5"
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${index === 1 ? "bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400" : "bg-gradient-to-r from-sky-300/50 via-cyan-200/40 to-sky-300/50"}`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-muted-foreground">{pack.hours}</p>
                  </div>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">{pack.price}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{pack.description}</p>

                  <div className="mt-4 inline-flex min-h-5 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">
                    Buy now
                    <span className="transition group-hover:translate-x-0.5">→</span>
                  </div>
                </Link>
              ))}
              </div>

            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingShell>
  );
}
