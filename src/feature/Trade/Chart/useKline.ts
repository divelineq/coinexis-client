import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useKline(
	symbol: string,
	interval: string,
	limitKline: number,
	category: string,
) {
	return useQuery({
		queryKey: ["kline", symbol, interval, limitKline, category],
		queryFn: () =>
			fetch(
				`https://api.bybit.com/v5/market/kline?category=${category}&symbol=${symbol}&interval=${interval}&limit=${limitKline}`,
			).then((res) => res.json()),

		select: (data) =>
			data.result.list
				.sort((a: any, b: any) => a[0] - b[0])
				.map((item: any) => ({
					time: Math.floor(item[0] / 1000),
					open: Number(item[1]),
					high: Number(item[2]),
					low: Number(item[3]),
					close: Number(item[4]),
				})),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});
}
