import { Auth } from "../models/auth";

import { api } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useGetAuth = () => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["auth"],
    queryFn: async (): Promise<Auth | null> => {
      try {
        const resp = await api.get("/auth");
        return resp.data;
      } catch (e) {
        console.error(e);
        navigate({ to: "/sign-in" });
        return null;
      }
    },
  });
};
