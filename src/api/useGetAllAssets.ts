import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Api } from "./types";
const API = import.meta.env.VITE_API_KEY;

export const useGetAllAssets = () => {
	return useSuspenseQuery<Api[]>({
		queryKey: ["currencies"],
		queryFn: async () => {
			const res = await axios.get(
						'https://api.mobula.io/api/1/all?fields=id%2Cname%2Clogo%2Cprice%2Cprice_change_1h%2Cprice_change_24h%2Cprice_change_7d%2Cprice_change_1m%2Cprice_change_1y',
            {
        headers: {
          Authorization: `Bearer ${API}`,
        },
      }
					)

        return res.data.data
		},
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retry: false,
	});
};
