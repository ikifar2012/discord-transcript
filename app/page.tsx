import { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingShell } from "./components/marketing-shell";
import { HeroCta, HeroCtaFallback } from "./components/hero-cta";
import { Reveal } from "./components/reveal";
import { HOUR_PACKS } from "./data/prices";
import { FAQS, HOME_JSON_LD, STEPS } from "./data/marketing";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <MarketingShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur sm:p-8">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em]">
              Transcribe for Discord
            </Badge>

            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Turn Discord voice messages into searchable text.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Sign in with Discord, get your first 5 voice messages transcribed free, and read them right
              where they were sent. Prepaid hours from $2, with no subscription and no server bot.
            </p>

            <div className="mt-7">
              <Suspense fallback={<HeroCtaFallback />}>
                <HeroCta />
              </Suspense>
            </div>
          </div>
          </Reveal>

          <Reveal delay={0.1}>
          <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <CardHeader>
              <CardTitle>
                <h2>How it works</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ol className="grid gap-3 md:grid-cols-3">
                {STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-xl bg-muted/45 p-4 ring-1 ring-border sm:p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          </Reveal>

          <Reveal delay={0.15}>
          <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <CardHeader>
              <CardTitle>
                <h2>Buy more hours</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-3 md:grid-cols-3">
              {HOUR_PACKS.map((pack, index) => (
                <Link
                  key={pack.id}
                  href="/dashboard"
                  className="group relative block overflow-hidden rounded-xl bg-muted/45 p-4 text-left ring-1 ring-border transition duration-200 hover:-translate-y-0.5 hover:bg-muted hover:ring-foreground/30 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-muted-foreground">{pack.hours}</p>
                    {index === 1 ? (
                      <Badge variant="secondary" className="rounded-full text-[10px] uppercase tracking-[0.12em]">
                        Popular
                      </Badge>
                    ) : null}
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
          </Reveal>

          <Reveal delay={0.2}>
          <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <CardHeader>
              <CardTitle>
                <h2>Frequently asked questions</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-border">
                {FAQS.map((faq) => (
                  <div key={faq.question} className="py-4 first:pt-0 last:pb-0 sm:py-5">
                    <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </Reveal>
        </div>
      </section>
    </MarketingShell>
  );
}
