import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export async function UsageCard({
  includedMinutes,
  usedMinutes,
}: {
  includedMinutes: number;
  usedMinutes: number;
}) {
  const remainingMinutes = includedMinutes - usedMinutes;
  const percentUsed = Math.round((usedMinutes / includedMinutes) * 100);

  return (
    <Card className="mt-7 rounded-lg bg-card/95">
      <CardContent>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Minutes used</p>
            <div className="mt-3 flex items-baseline gap-3">
              <p className="text-5xl font-semibold tracking-[-0.04em]">
                {usedMinutes}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                of {includedMinutes} minutes
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {remainingMinutes} minutes available. Usage will update here as your voice memos are transcribed.
            </p>
          </div>
          <div className="w-full lg:max-w-sm">
            <Progress value={percentUsed} className="gap-2" />
            <div className="mt-3 flex justify-between text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              <span>0m</span>
              <span>{includedMinutes}m</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
