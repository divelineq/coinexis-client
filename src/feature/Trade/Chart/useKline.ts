import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { OhlcData } from "lightweight-charts";

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
	return useQuery<KlineType, Error, OhlcData[]>({
		queryKey: ["kline", interval, symbol, limitKline, category],
		queryFn: async (): Promise<KlineType> => {
			const res = await axios.get(
				`/api/kline?category=${category}&symbol=${symbol}&interval=${interval}&limit=${limitKline}`,
			);

			//TODO: надо сделать НА БЭКЕ чтобы он получал все всю историю а не 1000 элементов как сейчас
			return res.data;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});
}
