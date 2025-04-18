import { api } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (restaurantId: string) => {
      return api.delete(`/restaurants/${restaurantId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      toast.success("Restaurant deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete restaurant");
    },
  });
};
