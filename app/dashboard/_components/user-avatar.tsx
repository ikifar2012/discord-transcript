import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type DashboardUser = {
  name: string;
  image: string | null;
};

export function UserAvatar({
  user,
  small = false,
}: {
  user: DashboardUser;
  small?: boolean;
}) {
  const initial = user.name.slice(0, 1).toUpperCase();

  return (
    <Avatar size={small ? "sm" : "lg"}>
      {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
}
