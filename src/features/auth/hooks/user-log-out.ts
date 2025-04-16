import { AxiosError } from "axios";
import { toast } from "sonner";

import { api } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const resp = await api.post("/auth/sign-out");
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
