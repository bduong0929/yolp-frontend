import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/restaurant/$restaurantId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { restaurantId } = useParams({
    from: "/(auth)/_auth/restaurant/$restaurantId",
  });

  return <div>{restaurantId}</div>;
}
