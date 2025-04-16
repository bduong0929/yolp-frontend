import { api } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Auth } from "../models/auth";

export const useGetUser = () => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["user"],
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
