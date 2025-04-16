import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
