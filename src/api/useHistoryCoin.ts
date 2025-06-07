import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import type { History } from "./types";



export const useHistoryCoin = (currency: string) => {
  return useSuspenseQuery<History>({
    queryKey: ['history', currency],
    queryFn: async () => {
      const res = await axios.get(`https://production-api.mobula.io/api/1/market/history?asset=${currency}&from=1697648158`);
      return res.data.data
    }
  })
}



