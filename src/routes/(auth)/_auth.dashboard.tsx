import { useGetAuth } from "@/features/auth/hooks/use-get-auth";
import { RestaurantCard } from "@/features/restaurants/components/restaurant-card";
import { useGetRestaurants } from "@/features/restaurants/hooks/use-get-restaurants";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: auth } = useGetAuth();
  const { data: restaurants } = useGetRestaurants();

  if (!auth) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
      {restaurants?.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
    </div>
  );
}
