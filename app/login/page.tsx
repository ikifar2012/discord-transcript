import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DiscordLoginButton } from "../components/discord-login-button";
import { MarketingShell } from "../components/marketing-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = ["OAuth", "Billing", "Minutes"];

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <MarketingShell showDashboardLink={false}>
      <section className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1fr_390px] lg:py-14">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="rounded-lg">Discord-native transcription</Badge>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-foreground sm:text-6xl">
            Connect Discord. Buy hours. Transcribe voice memos.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Discord Tools by Matheson keeps setup, billing, and usage tied to your Discord account.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {features.map((feature) => (
              <Badge key={feature} variant="outline" className="rounded-lg text-muted-foreground">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="rounded-lg border-border/80 bg-card/95 shadow-[0_30px_140px_rgba(0,0,0,0.65)]">
          <CardHeader>
            <CardDescription>Sign in</CardDescription>
            <CardTitle className="text-2xl tracking-[-0.02em]">Continue with Discord</CardTitle>
            <CardDescription>
              You will go straight to the transcription dashboard after authorization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DiscordLoginButton callbackURL="/dashboard" className="w-full" sessionAware={false} />
            <Separator className="my-5" />
            <p className="text-sm leading-6 text-muted-foreground">
              If you are already signed in, this page redirects automatically.
            </p>
          </CardContent>
        </Card>
      </section>
    </MarketingShell>
  );
}
