import type { OneCoinType } from "@api";
import { coinService } from "@service";
import { useQuery } from "@tanstack/react-query";

export function useGetCoin(coins: string[]) {
	return useQuery<OneCoinType[]>({
		queryKey: ["coin", coins],
		queryFn: ({ signal }) => {
			return Promise.all(
				coins.map((coin) => coinService.getCoin(signal, coin)),
			);
		},
	});
}
