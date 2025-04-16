import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_auth")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="flex h-full items-center justify-center">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
