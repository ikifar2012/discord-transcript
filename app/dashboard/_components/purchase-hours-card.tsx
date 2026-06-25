import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type HourPack = {
  hours: string;
  price: string;
  description: string;
};

export function PurchaseHoursCard({ hourPacks }: { hourPacks: HourPack[] }) {
  return (
    <Card className="rounded-lg bg-card/95">
      <CardHeader>
        <CardTitle>Purchase hours</CardTitle>
        <CardDescription>Add transcription time to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-3">
          {hourPacks.map((pack) => (
            <HourPackButton key={pack.hours} pack={pack} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HourPackButton({ pack }: { pack: HourPack }) {
  return (
    <button
      type="button"
      className="rounded-lg bg-muted/45 p-4 text-left ring-1 ring-border transition hover:bg-muted"
    >
      <p className="text-sm font-medium text-muted-foreground">{pack.hours}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
        {pack.price}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {pack.description}
      </p>
    </button>
  );
}
