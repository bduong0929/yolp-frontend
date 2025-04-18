import { toast } from "sonner";
import { AxiosError } from "axios";
import { AddReviewSchema } from "../schemas/add-review-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios-config";

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddReviewSchema) => {
      const response = await api.post("/reviews", data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant", variables.restaurantId],
      });
      toast.success("Review added successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to add review");
      } else {
        toast.error("Failed to add review");
      }
    },
  });
};
