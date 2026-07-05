import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UsageCardSkeleton() {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full ml-2 shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main stat skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-48 mt-2" />
        </div>

        {/* Progress bar skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-7 w-20 mt-1" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-7 w-20 mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
