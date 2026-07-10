import { MarketingShell } from "./marketing-shell";
import { LEGAL_UPDATED, type LegalSection } from "../data/legal";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <MarketingShell>
      <section className="py-10 sm:py-12">
        <article className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated {LEGAL_UPDATED}</p>
          <p className="mt-5 text-base leading-7 text-muted-foreground">{intro}</p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-6 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </section>
    </MarketingShell>
  );
}
