import { Restaurant } from "../models/restaurant";

import { api } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurantById = (restaurantId: string) => {
  return useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: async (): Promise<Restaurant | null> => {
      try {
        const resp = await api.get(`/restaurants/${restaurantId}`);
        return resp.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  });
};
