import { useGetAuth } from "@/features/auth/hooks/use-get-auth";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: auth } = useGetAuth();

  if (!auth) {
    return <Navigate to="/sign-in" />;
  }

  return <div>Dashboard</div>;
}
