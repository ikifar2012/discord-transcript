import Link from "next/link";
import { MarketingShell } from "./components/marketing-shell";

const steps = [
  ["Connect", "Sign in with Discord and open the dashboard."],
  ["Purchase", "Add transcription hours for long voice memos."],
  ["Transcribe", "Use the bot inside Discord when audio needs to become text."],
];

export default function Home() {
  return (
    <MarketingShell>
      <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1fr_430px] lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">
            Discord voice memo transcription
          </p>
          <h1 className="mt-5 max-w-4xl text-6xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-7xl">
            Turn voice memos into text without leaving Discord.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Discord Tools by Matheson lets users purchase transcription hours and use them directly from Discord. Three hours starts at $3.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
              Open dashboard
            </Link>
            <Link href="/login" className="inline-flex h-9 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80">
              Continue with Discord
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-card p-5 shadow-[0_30px_140px_rgba(0,0,0,0.65)] ring-1 ring-border">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Transcription</p>
              <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-foreground">180 minutes available</h2>
            </div>
            <span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">$3</span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[22%] rounded-full bg-primary" />
          </div>

          <div className="mt-6 space-y-4">
            {steps.map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
