import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UsageCardSkeleton() {
  return (
    <Card className="mt-7 rounded-lg bg-card/95">
      <CardContent>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Minutes used</p>
            <div className="mt-3 flex items-baseline gap-3">
              <Skeleton className="h-14 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="mt-3 h-6 w-full max-w-md" />
          </div>
          <div className="w-full lg:max-w-sm">
            <Skeleton className="h-2 w-full" />
            <div className="mt-3 flex justify-between">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
