import { type CoinService, coinService } from "@service";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useCoins() {
	return useSuspenseQuery<CoinService>({
		queryKey: ["coins"],
		queryFn: ({ signal }) => coinService.getCoins(signal),
		select: (data) => ({
			...data,
			coins: data.coins
				.filter(
					(coin) => coin.price && coin.price > 0.0 && coin.price_change_1m > 0,
				)
				.sort((a, b) => b.volume - a.volume),
		}),
		refetchInterval: 30_000,
		refetchIntervalInBackground: false,
		staleTime: 10_000,
		retry: false,
	});
}
