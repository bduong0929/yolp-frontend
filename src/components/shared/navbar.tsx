import { UserAvatar } from "./user-avatar";

export const Navbar = () => {
  return (
    <div className="border-b border-gray-200">
      <nav className="mx-auto flex w-11/12 max-w-screen items-center justify-between py-4">
        <ul>
          <h1 className="text-2xl font-bold">Yolp</h1>
        </ul>
        <ul>
          <UserAvatar />
        </ul>
      </nav>
    </div>
  );
};
