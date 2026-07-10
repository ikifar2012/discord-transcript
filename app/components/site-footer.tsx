import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-border py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-lg bg-primary text-[10px] font-semibold text-primary-foreground"
        >
          TD
        </span>
        <div>
          <p className="text-foreground/85">Transcribe for Discord by Matheson</p>
          <p className="text-xs">
            Proudly built in Toronto <span aria-hidden>🍁</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 sm:items-end">
        <p>Voice message transcription for your Discord account.</p>
        <nav aria-label="Legal" className="flex gap-4 text-xs">
          <Link href="/privacy" className="transition hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-foreground">
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  );
}
