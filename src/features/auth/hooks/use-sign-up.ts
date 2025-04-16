import { toast } from "sonner";
import { AxiosError } from "axios";
import { SignUpSchema } from "../schemas/sign-up-schema";

import { api } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: SignUpSchema) => {
      const resp = await api.post("/auth/sign-up", values);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Signed up successfully");
      navigate({ to: "/sign-in" });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
