import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Discord Tools home">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
        DT
      </span>
      <span>
        <span className="block text-sm font-semibold tracking-[0.08em] text-foreground/85">
          DISCORD TOOLS
        </span>
        {!compact ? (
          <span className="block text-xs leading-none text-muted-foreground">
            by Matheson
          </span>
        ) : null}
      </span>
    </Link>
  );
}
