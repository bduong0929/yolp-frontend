import { Loader2 } from "lucide-react";

import { createFileRoute, useParams } from "@tanstack/react-router";
import { useGetRestaurantById } from "@/features/restaurants/hooks/use-get-restaurant-by-id";

export const Route = createFileRoute("/(auth)/_auth/restaurant/$restaurantId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { restaurantId } = useParams({
    from: "/(auth)/_auth/restaurant/$restaurantId",
  });

  const { data: restaurant, isLoading } = useGetRestaurantById(restaurantId);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      </div>
    </div>
  );
}
