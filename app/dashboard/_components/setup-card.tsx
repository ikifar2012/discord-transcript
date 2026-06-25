import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type SetupStep = {
  title: string;
  description: string;
  done: boolean;
};

export function SetupCard({ steps }: { steps: SetupStep[] }) {
  return (
    <Card className="rounded-lg bg-card/95">
      <CardHeader>
        <CardTitle>Bot setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.title}>
              <StepItem step={step} />
              {index < steps.length - 1 ? <Separator className="mt-4" /> : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StepItem({ step }: { step: SetupStep }) {
  return (
    <div className="flex gap-3">
      <Badge
        variant={step.done ? "default" : "secondary"}
        className="mt-0.5 size-5 rounded-full p-0 text-[10px]"
      >
        {step.done ? "✓" : ""}
      </Badge>
      <div>
        <p className="text-sm font-medium">{step.title}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {step.description}
        </p>
      </div>
    </div>
  );
}
