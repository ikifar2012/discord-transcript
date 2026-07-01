import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchasePackSubmitButton } from "./purchase-pack-submit-button";

export type HourPack = {
  id: number;
  hours: string;
  price: string;
  description: string;
};

export function PurchaseHoursCard({
  hourPacks,
  checkoutAction,
}: {
  hourPacks: readonly HourPack[];
  checkoutAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardHeader>
        <CardTitle>Buy more hours</CardTitle>
        <CardDescription>Add transcription time to your account.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-3 md:grid-cols-3">
          {hourPacks.map((pack, index) => (
            <HourPackButton
              key={pack.hours}
              pack={pack}
              index={index}
              checkoutAction={checkoutAction}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HourPackButton({
  pack,
  index,
  checkoutAction,
}: {
  pack: HourPack;
  index: number;
  checkoutAction: (formData: FormData) => Promise<void>;
}) {
  const isFeatured = index === 1;

  return (
    <form action={checkoutAction}>
      <input type="hidden" name="packId" value={pack.id} />
      <PurchasePackSubmitButton
        hours={pack.hours}
        price={pack.price}
        description={pack.description}
        isFeatured={isFeatured}
      />
    </form>
  );
}
