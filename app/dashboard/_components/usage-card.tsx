import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  function formatTime(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
    }
    return `${minutes} min`;
  }

  const progressColor =
    percentUsed >= 90
      ? "bg-destructive"
      : percentUsed >= 70
        ? "bg-amber-500"
        : "bg-primary";

  const statusVariant =
    percentUsed >= 90 ? "destructive" : percentUsed >= 70 ? "outline" : "secondary";

  const statusLabel =
    percentUsed >= 90 ? "Critical" : percentUsed >= 70 ? "Low" : "Healthy";

  return (
    <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Transcription Usage</CardTitle>
            <CardDescription className="mt-1">Your current balance and usage at a glance.</CardDescription>
          </div>
          <Badge variant={statusVariant} className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.12em]">
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-5 pb-5 sm:pt-6 sm:pb-6">
        <div className="flex flex-col gap-6">
          {/* Big remaining stat */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Remaining</p>
              <p className="mt-1 text-5xl font-semibold tracking-[-0.04em] tabular-nums">
                {formatTime(remainingMinutes)}
              </p>
            </div>
            <div className="flex gap-6 pb-1 text-right">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Used</p>
                <p className="mt-1 text-xl font-medium tracking-[-0.03em] tabular-nums">
                  {formatTime(safeUsedMinutes)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Total</p>
                <p className="mt-1 text-xl font-medium tracking-[-0.03em] tabular-nums">
                  {formatTime(safeIncludedMinutes)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span className="uppercase tracking-[0.12em]">Usage</span>
              <span className="tabular-nums">{percentUsed}%</span>
            </div>
            <Progress
              value={percentUsed}
              className="h-2.5 rounded-full"
              indicatorClassName={progressColor}
            />
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Usage updates automatically as your voice memos are processed.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
