"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DeleteAccountCard() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setPending(true);
    setError(null);

    const { error: deleteError } = await authClient.deleteUser();

    if (deleteError) {
      setPending(false);
      setOpen(true);
      setError(
        deleteError.code === "SESSION_EXPIRED"
          ? "For security, deleting your account needs a recent sign-in. Log out, log back in, and try again."
          : deleteError.message ?? "Something went wrong. Please try again.",
      );
      return;
    }

    setOpen(false);
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
        <AlertDialog
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (!nextOpen) {
              setError(null);
            }
          }}
        >
          <AlertDialogTrigger render={<Button variant="destructive" disabled={pending} />}>
            Delete my account
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent. Your profile data will be removed, while usage and balance
                history stays tied to your Discord ID.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {error ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
              <Button variant="destructive" onClick={handleDelete} disabled={pending}>
                {pending ? "Deleting..." : "Yes, delete account"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
