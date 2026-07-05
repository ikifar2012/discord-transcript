import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export async function UsageCard({
  includedMinutes,
  usedMinutes,
  freeTranscriptionsRemaining,
  freeTranscriptionsUsed,
}: {
  includedMinutes: number;
  usedMinutes: number;
  freeTranscriptionsRemaining: number;
  freeTranscriptionsUsed: number;
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
    percentUsed >= 90 ? "bg-destructive" : percentUsed >= 70 ? "bg-amber-500" : "bg-primary";

  const statusVariant =
    percentUsed >= 90 ? "destructive" : percentUsed >= 70 ? "outline" : "secondary";

  const statusLabel =
    percentUsed >= 90 ? "Critical" : percentUsed >= 70 ? "Low" : "Healthy";

  return (
    <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle>Transcription Usage</CardTitle>
            <CardDescription className="mt-1">Your current balance and usage.</CardDescription>
          </div>
          <Badge variant={statusVariant} className="ml-2 shrink-0">
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Free transcriptions */}
        {freeTranscriptionsRemaining > 0 && (
          <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 px-6 py-5 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Free Transcriptions Available</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">{freeTranscriptionsRemaining}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">of 5</span>
              </div>
              <Progress 
                value={(freeTranscriptionsUsed / 5) * 100} 
                className="h-3"
                indicatorClassName="bg-green-500 dark:bg-green-600"
              />
            </div>
          </div>
        )}

        {/* Main stat: Remaining */}
        <div>
          <p className="text-sm font-medium text-muted-foreground">Paid Time Remaining</p>
          <p className="mt-2 text-4xl font-bold tabular-nums">
            {formatTime(remainingMinutes)}
          </p>
        </div>

        {/* Progress bar */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">Usage</span>
            <span className="font-semibold tabular-nums">{percentUsed}%</span>
          </div>
          <Progress value={percentUsed} className="h-3 rounded-full" indicatorClassName={progressColor} />
        </div>

        {/* Used & Total */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Used</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">{formatTime(safeUsedMinutes)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">{formatTime(safeIncludedMinutes)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
