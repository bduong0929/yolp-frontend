import { useGetUser } from "@/features/users/hooks/use-get-user";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: user } = useGetUser();

  if (user) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/sign-in" />;
  }
}
