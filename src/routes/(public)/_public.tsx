import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
