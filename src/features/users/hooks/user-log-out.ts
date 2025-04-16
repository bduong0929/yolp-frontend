import { api } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserLogOut = () => {
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
      console.log(error);
    },
  });
};
