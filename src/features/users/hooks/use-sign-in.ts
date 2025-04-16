import { toast } from "sonner";
import { AxiosError } from "axios";

import { api } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const resp = await api.post("/auth/sign-in", data);
      return resp.data;
    },
    onSuccess: () => {
      // Invalidate the user query to refetch the data
      // This means that the user query will be refetched
      // and the data will be updated in the cache
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Signed in successfully");
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
