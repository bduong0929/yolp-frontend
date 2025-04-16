import { Link } from "@tanstack/react-router";
import { useLogout } from "@/features/users/hooks/user-log-out";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetUser } from "@/features/users/hooks/use-get-user";

export const UserAvatar = () => {
  const { mutate: logout } = useLogout();
  const { data: user } = useGetUser();

  console.log("User", user);

  const getInitials = (name: string) => {
    if (!name) return "";

    const arr = name.split(" ");
    return arr[0][0] + arr[1][0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{getInitials(user?.username)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
