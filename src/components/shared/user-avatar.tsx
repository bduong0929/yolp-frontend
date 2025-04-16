import { Avatar, AvatarFallback } from "../ui/avatar";

export const UserAvatar = () => {
  const user = {
    name: "John Doe",
  };

  const getInitials = (name: string) => {
    const arr = name.split(" ");
    return arr[0][0] + arr[1][0];
  };

  return (
    <Avatar>
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
};
