import { Restaurant } from "../models/restaurant";

import { api } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async (): Promise<Restaurant[]> => {
      try {
        const response = await api.get("/restaurants");
        return response.data;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  });
};
