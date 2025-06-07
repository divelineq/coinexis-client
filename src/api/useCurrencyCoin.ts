import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Api } from "./types";
import { useGetAllAssetsName } from "./useGetAllAssetsName";

export const useGetAllAssets = () => {
  const {data} = useGetAllAssetsName()

  return useSuspenseQuery<Api[]>({
    queryKey: ["currencies"],
   queryFn: async () => {
  const results = await Promise.all(
    data.map(async (currency: string) => {
      try {
        const res = await axios.get(
          `https://production-api.mobula.io/api/1/market/data?asset=${currency}`
        );
        return res.data.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.warn(`Актив ${currency} не найден (404)`);
            return null;
          }
        }
        console.error(`Ошибка при загрузке ${currency}:`, error);
        return null; 
      }
    },{
      concurrency: 10,
    })
  );

  return results.filter((res) => res !== null);
    },
    refetchInterval: 10000, 
    staleTime: 0,
})}

