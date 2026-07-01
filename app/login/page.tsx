import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DiscordLoginButton } from "../components/discord-login-button";
import { MarketingShell } from "../components/marketing-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <MarketingShell>
      <section className="flex flex-1 flex-col items-center justify-center py-12 lg:py-20">
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="space-y-3 text-center">
            <div className="flex justify-center">
              <div className="rounded-2xl bg-gradient-to-br from-[#5865f2] to-[#4752c4] p-4">
                <svg
                  className="size-12 text-white"
                  viewBox="0 0 127.14 96.36"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A99.68,99.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0A105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a77.15,77.15,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.22,77,77,0,0,0,6.89,11.1A105.73,105.73,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60.55,31,53.88s5-11.8,11.43-11.8c6.46,0,11.63,5.15,11.63,11.81S48.7,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60.55,73.25,53.88s5-11.8,11.44-11.8c6.45,0,11.63,5.15,11.63,11.81S91.16,65.69,84.69,65.69Z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="text-base text-muted-foreground">
              Sign in with Discord to access your transcription dashboard
            </p>
          </div>

          {/* Login Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <DiscordLoginButton callbackURL="/dashboard" className="w-full" sessionAware={false} />
              
              <Separator className="my-6" />

              {/* Info Text */}
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Automatically redirects if you&apos;re already signed in. No account creation needed, just Discord OAuth.
              </p>
            </CardContent>
          </Card>

          {/* Footer Text */}
          <p className="text-center text-xs text-muted-foreground/70">
            By signing in, you agree to our service terms
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
