import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useGetAuth } from "@/features/auth/hooks/use-get-auth";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: auth } = useGetAuth();

  if (auth) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/sign-in" />;
  }
}
