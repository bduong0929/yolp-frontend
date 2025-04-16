import { Loader2 } from "lucide-react";

import { useGetUser } from "@/features/users/hooks/use-get-user";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  const { data: user, isLoading } = useGetUser();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
