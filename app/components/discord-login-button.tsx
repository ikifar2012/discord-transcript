"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type DiscordLoginButtonProps = {
  className?: string;
  callbackURL?: string;
  showDashboardLink?: boolean;
  sessionAware?: boolean;
};

export function DiscordLoginButton({
  className = "",
  callbackURL = "/dashboard",
  showDashboardLink = true,
  sessionAware = true,
}: DiscordLoginButtonProps) {
  const { data: session, isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setIsLoading(true);
    setError(null);

    const result = await authClient.signIn.social({
      provider: "discord",
      callbackURL,
      errorCallbackURL: "/login",
    });

    if (result?.error) {
      setError(result.error.message ?? "Discord sign in could not start.");
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    setError(null);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
        onError: (ctx) => {
          setError(ctx.error.message ?? "Sign out failed.");
          setIsSigningOut(false);
        },
      },
    });
  }

  if (sessionAware && isPending) {
    return (
      <div className="w-full">
        <div className={cn("flex h-9 w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground", className)}>
          Checking session
        </div>
      </div>
    );
  }

  if (sessionAware && session?.user) {
    const displayName = session.user.name || session.user.email || "Discord user";
    const initials = displayName.slice(0, 1).toUpperCase();

    return (
      <div className="w-full space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 ring-1 ring-border">
          <Avatar size="lg">
            {session.user.image ? <AvatarImage src={session.user.image} alt={displayName} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-emerald-300">Connected</p>
            <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {showDashboardLink ? (
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), className)}>
              Dashboard
            </Link>
          ) : null}
          <Button type="button" variant="secondary" size="lg" onClick={handleSignOut} disabled={isSigningOut}>
            {isSigningOut ? "Signing out" : "Sign out"}
          </Button>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <Button type="button" size="lg" onClick={handleSignIn} disabled={isLoading} className={cn("w-full", className)}>
        <span className="grid size-5 place-items-center rounded-md bg-[#5865f2] text-[11px] font-black text-white">
          D
        </span>
        {isLoading ? "Connecting" : "Continue with Discord"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
