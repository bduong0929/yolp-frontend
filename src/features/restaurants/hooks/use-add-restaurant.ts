import { toast } from "sonner";
import { AxiosError } from "axios";
import { AddRestaurantSchema } from "../schemas/add-restaurant-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios-config";

export const useAddRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddRestaurantSchema) => {
      const response = await api.post("/restaurants", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      toast.success("Restaurant added");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};
