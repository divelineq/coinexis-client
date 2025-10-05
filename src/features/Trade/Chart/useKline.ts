import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import type { OhlcData } from "lightweight-charts";

export function useKline(
	symbol: string,
	interval: string,
	limitKline: number,
	category: string,
) {
	return useInfiniteQuery({
		queryKey: ["kline", interval, symbol, limitKline, category],
		queryFn: ({ pageParam }): Promise<OhlcData[]> =>
			axios
				.get(
					`/api/kline?category=${category}&symbol=${symbol}&interval=${interval}&limit=${limitKline}&end=${pageParam}`,
				)
				.then((res) => res.data),
		getNextPageParam: (lastPage) => {
			if ((lastPage as any)?.length < limitKline) {
				return undefined;
			}

			return (lastPage as any)[0].time * 1000;
		},
		initialPageParam: Date.now(),
		select: ({ pages }) => {
			const map = new Map<number, OhlcData>();

			for (const item of Object.values(pages).flat()) {
				map.set(item.time as number, item);
			}

			return [...map.values()].sort(
				(a, b) => (a.time as number) - (b.time as number),
			);
		},
		gcTime: Number.POSITIVE_INFINITY,
		staleTime: Number.POSITIVE_INFINITY,
	});
}
