import { SignUpSchema } from "../schemas/sign-up-schema";

import { api } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: SignUpSchema) => {
      const resp = await api.post("/auth/sign-up", values);
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
