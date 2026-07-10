"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DeleteAccountCard() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setPending(true);
    setError(null);

    const { error: deleteError } = await authClient.deleteUser();

    if (deleteError) {
      setPending(false);
      setConfirming(false);
      setError(
        deleteError.code === "SESSION_EXPIRED"
          ? "For security, deleting your account needs a recent sign-in. Log out, log back in, and try again."
          : deleteError.message ?? "Something went wrong. Please try again.",
      );
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <Card className="rounded-2xl border-destructive/30 bg-card/85 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <CardHeader>
        <CardTitle>Delete account</CardTitle>
        <CardDescription>
          Permanently removes your personal information from our records: your name, email, avatar,
          and sign-in data. Usage and balance records stay linked to your Discord ID, so any remaining
          time is kept if you come back and free transcriptions are not reset.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending ? "Deleting..." : confirming ? "Click again to confirm" : "Delete my account"}
          </Button>
          {confirming && !pending ? (
            <Button variant="ghost" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          ) : null}
        </div>
        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      </CardContent>
    </Card>
  );
}
