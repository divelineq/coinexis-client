import { httpBinanceClient } from "src/api/httpClient";
import type { TickerPriceSymbolType } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export const tickerPriceApi = {
	async getOne(symbol: string, signal: AbortSignal) {
		const res = await httpBinanceClient.get<{ data: TickerPriceSymbolType }>(
			`/ticker/price?symbol=${symbol}`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data;
	},

	async getMany(symbols: string[], signal: AbortSignal) {
		const res = await httpBinanceClient.get<{ data: TickerPriceSymbolType[] }>(
			`/ticker/price??symbols=${symbols.join(",")}`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data;
	},
};
