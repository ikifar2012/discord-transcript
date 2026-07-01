import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


export async function UsageCard({
  includedMinutes,
  usedMinutes,
}: {
  includedMinutes: number;
  usedMinutes: number;
}) {
  const safeIncludedMinutes = Math.max(0, Math.round(includedMinutes));
  const safeUsedMinutes = Math.max(0, Math.round(usedMinutes));
  const remainingMinutes = Math.max(0, safeIncludedMinutes - safeUsedMinutes);
  const percentUsed = safeIncludedMinutes === 0
    ? 0
    : Math.min(100, Math.round((safeUsedMinutes / safeIncludedMinutes) * 100));

  return (
    <Card className="mt-6 rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-muted/45 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Remaining</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{remainingMinutes}m</p>
            </div>
            <div className="rounded-xl bg-muted/45 p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Used</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{safeUsedMinutes}m</p>
            </div>
            <div className="col-span-2 rounded-xl bg-muted/45 p-3 sm:col-span-1">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Total</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{safeIncludedMinutes}m</p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              <span>Usage</span>
              <span>{percentUsed}%</span>
            </div>
            <Progress value={percentUsed} className="h-2" />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Usage updates automatically as your voice memos are processed.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
