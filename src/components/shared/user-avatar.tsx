import { Link } from "@tanstack/react-router";
import { useLogout } from "@/features/users/hooks/user-log-out";
import { useGetUser } from "@/features/users/hooks/use-get-user";
import { useConfirm } from "@/hooks/use-confirm";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const UserAvatar = () => {
  const [logoutConfirm, LogoutConfirmDialog] = useConfirm();

  const { mutate: logout } = useLogout();
  const { data: user } = useGetUser();

  const getInitials = (name: string | undefined) => {
    if (!name) return "";

    return (name[0] + name[1]).toUpperCase();
  };

  const handleLogout = async () => {
    const ok = await logoutConfirm();
    if (!ok) return;

    logout();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>{getInitials(user?.username ?? "")}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link to="/">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutConfirmDialog
        title="Are you sure you want to log out?"
        description="This action will log you out of your account and you will need to log in again."
        confirmLabel="Log out"
        cancelLabel="Cancel"
        destructive
      />
    </>
  );
};
