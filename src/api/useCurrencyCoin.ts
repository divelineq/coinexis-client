import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Api } from "./types";




export const useCurrencyCoin = (currencies: string[]) => {
  return useSuspenseQuery<Api[]>({
    queryKey: ["currency", currencies],
    queryFn: async () => {
      const results = await Promise.all(
        currencies.map(async (currency) => {
          const res = await axios.get(
            `https://production-api.mobula.io/api/1/market/data?asset=${currency}`
          );
          return res.data.data;
        })
      );
      return results;
    },
    refetchInterval: 10000, 
    staleTime: 0,
})}

