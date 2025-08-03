import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { OhlcData, UTCTimestamp } from "lightweight-charts";

type RawKlineItem = [
	string, // timestamp в мс (например, "1754149500000")
	string, // open
	string, // high
	string, // low
	string, // close
	string, // volume
	string, // turnover
];

type KlineType = {
	time: number;
	retMsg: string;
	retExtInfo: Record<string, any>;
	retCode: number;
	result: {
		symbol: string;
		category: string;
		list: RawKlineItem[];
	};
};

export function useKline(
	symbol: string,
	interval: string,
	limitKline: number,
	category: string,
) {
	//TODO: надо сделать чтобы он получал все монеты или получал следующий диапазон при пролистывании
	return useQuery<KlineType, Error, OhlcData[]>({
		queryKey: ["kline", interval, symbol, limitKline, category],
		queryFn: async (): Promise<KlineType> => {
			const res = await axios.get(
				`https://api.bybit.com/v5/market/kline?category=${category}&symbol=${symbol}&interval=${interval}&limit=${limitKline}`,
			);

			return res.data;
		},

		select: (data): OhlcData[] =>
			data.result.list
				.sort((a: any, b: any) => a[0] - b[0])
				.map((item: any) => ({
					time: Math.floor(item[0] / 1000) as UTCTimestamp,
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
