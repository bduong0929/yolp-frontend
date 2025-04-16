import { Loader2 } from "lucide-react";

import { useGetAuth } from "@/features/auth/hooks/use-get-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  const { data: auth, isLoading } = useGetAuth();

  if (auth) {
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
