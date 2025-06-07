import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Api } from "./types";
import { useGetAllAssetsName } from "./useGetAllAssetsName";



export const useGetAllAssets = () => {
  const {data} = useGetAllAssetsName()

  return useSuspenseQuery<Api[]>({
    queryKey: ["currencies"],
   queryFn: async () => {
    if (!data || data.length === 0) {
    return [];
  }

  const results = await Promise.allSettled(
  data.map((currency: string) =>
    axios.get(`https://production-api.mobula.io/api/1/market/data?asset=${currency}`),
  ),
  
);

const successful = results
  .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
  .map((r) => r.value.data.data);

return successful;
    },
    refetchInterval: 10000, 
    staleTime: 0,
    retry: false,
})}

