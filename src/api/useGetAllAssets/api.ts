import { useSuspenseQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type { AllAssetsTypes } from ".";

const API = import.meta.env.VITE_API_KEY;

export const useGetAllAssets = () => {
	return useSuspenseQuery<AllAssetsTypes[]>({
		queryKey: ["currencies"],
		queryFn: async ({ signal }) => {
			const res = await axios.get<AxiosResponse<AllAssetsTypes[]>>(
				"https://api.mobula.io/api/1/all?fields=id%2Cname%2Clogo%2Cprice%2Cprice_change_1h%2Cprice_change_24h%2Cprice_change_7d%2Cprice_change_1m%2Cprice_change_1y%2Cvolume",
				{
					headers: {
						Authorization: `Bearer ${API}`,
					},
					signal,
				},
			);

			return res.data.data;
		},
		select: (data) =>
			data
				.filter((coin) => coin.price > 0.0 && coin.price_change_1m > 0)
				.sort((a, b) => b.volume - a.volume),
		refetchInterval: 30_000,
		refetchIntervalInBackground: false,
		staleTime: 10_000,
		retry: false,
	});
};
