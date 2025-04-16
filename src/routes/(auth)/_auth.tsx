import { Navbar } from "@/components/shared/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto w-11/12 max-w-screen">
        <Outlet />
      </main>
    </div>
  );
}
