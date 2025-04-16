import { useState } from "react";
import { Home, LogOut, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Link } from "@tanstack/react-router";
import { useLogout } from "@/features/auth/hooks/user-log-out";
import { useGetAuth } from "@/features/auth/hooks/use-get-auth";
import { useConfirm } from "@/hooks/use-confirm";
import { AddRestaurantDialog } from "@/features/restaurants/components/add-restaurant-dialog";

export const UserAvatar = () => {
  const [addRestaurantDialog, setAddRestaurantDialog] = useState(false);
  const [logoutConfirm, LogoutConfirmDialog] = useConfirm();

  const { mutate: logout } = useLogout();
  const { data: auth } = useGetAuth();

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
            <AvatarFallback>{getInitials(auth?.username ?? "")}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Home className="mr-2 size-4" />
            <Link to="/">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {auth?.role === "ADMIN" && (
            <DropdownMenuItem onClick={() => setAddRestaurantDialog(true)}>
              <Plus className="mr-2 size-4" />
              Add restaurant
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddRestaurantDialog
        open={addRestaurantDialog}
        setOpen={setAddRestaurantDialog}
      />

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
