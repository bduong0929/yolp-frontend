import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const UserAvatar = () => {
  const user = {
    name: "John Doe",
  };

  const handleLogout = () => {
    console.log("logout");
  };

  const getInitials = (name: string) => {
    const arr = name.split(" ");
    return arr[0][0] + arr[1][0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
