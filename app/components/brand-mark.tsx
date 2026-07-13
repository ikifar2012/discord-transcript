import Image from "next/image";
import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Transcribe for Discord home">
      <Image
        src="/logo.png"
        alt=""
        width={32}
        height={32}
        unoptimized
        className="size-8 rounded-lg"
      />
      <span>
        <span className="block text-sm font-semibold tracking-[0.08em] text-foreground/85">
          TRANSCRIBE FOR DISCORD
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
