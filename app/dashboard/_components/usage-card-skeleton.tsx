import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function UsageCardSkeleton() {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-5 pb-5 sm:pt-6 sm:pb-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-36" />
            </div>
            <div className="flex gap-6 pb-1">
              <div className="space-y-2 text-right">
                <Skeleton className="ml-auto h-3 w-10" />
                <Skeleton className="h-7 w-20" />
              </div>
              <div className="space-y-2 text-right">
                <Skeleton className="ml-auto h-3 w-10" />
                <Skeleton className="h-7 w-20" />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-2.5 w-full rounded-full" />
            <Skeleton className="mt-3 h-3 w-72" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
