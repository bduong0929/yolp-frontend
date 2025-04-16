import { api } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const resp = await api.get("/auth");
      return resp.data;
    },
  });
};
