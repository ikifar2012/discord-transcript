"use client";

import { useFormStatus } from "react-dom";

type PurchasePackSubmitButtonProps = {
  hours: string;
  price: string;
  description: string;
  isFeatured: boolean;
};

export function PurchasePackSubmitButton({
  hours,
  price,
  description,
  isFeatured,
}: PurchasePackSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-muted/45 p-4 text-left ring-1 ring-border transition duration-200 hover:-translate-y-0.5 hover:bg-muted hover:ring-foreground/30 sm:p-5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-80"
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${isFeatured ? "bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400" : "bg-gradient-to-r from-sky-300/50 via-cyan-200/40 to-sky-300/50"}`}
      />

      <p className="text-sm font-medium text-muted-foreground">{hours}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">{price}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>

      <div className="mt-4 inline-flex min-h-5 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">
        {pending ? (
          <>
            <span className="size-3 rounded-full border border-foreground/60 border-t-transparent animate-spin" />
            Redirecting...
          </>
        ) : (
          <>
            Buy now
            <span className="transition group-hover:translate-x-0.5">→</span>
          </>
        )}
      </div>
    </button>
  );
}
