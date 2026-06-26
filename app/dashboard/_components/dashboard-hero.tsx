import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardHero() {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <Badge variant="secondary" className="rounded-lg">
          Transcription
        </Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
          Manage transcription hours
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          Buy transcription hours for your Discord voice memos and track the minutes used by your account.
        </p>
      </div>
      <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "h-10")}>
        Manage account
      </Link>
    </div>
  );
}
