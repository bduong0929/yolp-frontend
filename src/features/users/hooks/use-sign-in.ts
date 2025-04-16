import { api } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const resp = await api.post("/auth/sign-in", data);
      return resp.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
