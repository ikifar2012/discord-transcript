"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function DiscordIcon() {
  return (
    <svg
      className="size-5"
      viewBox="0 0 127.14 96.36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A99.68,99.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0A105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a77.15,77.15,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.22,77,77,0,0,0,6.89,11.1A105.73,105.73,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60.55,31,53.88s5-11.8,11.43-11.8c6.46,0,11.63,5.15,11.63,11.81S48.7,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60.55,73.25,53.88s5-11.8,11.44-11.8c6.45,0,11.63,5.15,11.63,11.81S91.16,65.69,84.69,65.69Z" />
    </svg>
  );
}

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
      <Button 
        type="button" 
        size="lg" 
        onClick={handleSignIn} 
        disabled={isLoading}
        className={cn(
          "w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold transition-all duration-200",
          className
        )}
      >
        <DiscordIcon />
        {isLoading ? "Connecting..." : "Continue with Discord"}
      </Button>
      {error ? <p className="text-sm text-destructive font-medium">{error}</p> : null}
    </div>
  );
}
