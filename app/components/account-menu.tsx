"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";

export type AccountMenuUser = {
  name: string;
  image: string | null;
};

export function AccountMenu({ user }: { user: AccountMenuUser | null }) {
  if (!user) {
    return (
      <Link href="/login" className={cn(buttonVariants({ variant: "secondary" }), "h-8 px-3")}>
        Log in
      </Link>
    );
  }

  const initial = user.name.slice(0, 1).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full active:scale-95" aria-label="Open account menu" />}>
        <Avatar>
          {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 rounded-2xl border border-white/15 bg-popover/60 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl duration-200 ease-out"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2.5 p-2">
            <Avatar>
              {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">{user.name}</span>
              <span className="block truncate text-xs font-normal text-muted-foreground">Discord account</span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="-mx-1.5" />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/dashboard" />} className="rounded-[10px] px-2 py-1.5">
            <LayoutDashboardIcon className="text-muted-foreground" />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="-mx-1.5" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="rounded-[10px] px-2 py-1.5"
            onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/login"; } } })}
          >
            <LogOutIcon />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
