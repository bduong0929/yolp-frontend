import { useGetUser } from "@/features/users/hooks/use-get-user";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: user } = useGetUser();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <div>Dashboard</div>;
}
