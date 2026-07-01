import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UsageCardSkeleton() {
  return (
    <Card className="mt-6 rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="col-span-2 h-20 rounded-xl sm:col-span-1" />
          </div>

          <div>
            <Skeleton className="mb-2 h-3 w-20" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="mt-3 h-5 w-full max-w-sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
