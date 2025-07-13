import { httpBinanceClient } from "../httpClient";
import type { Ticker24HType } from "./dto";

export const ticker24hApi = {
	async getOne(symbol: string, signal: AbortSignal): Promise<Ticker24HType> {
		const res = await httpBinanceClient.get<Ticker24HType>(
			`/ticker/24hr?symbol=${symbol}`,
			{
				signal,
			},
		);

		return res.data;
	},
	async getMany(
		symbols: string[],
		signal: AbortSignal,
	): Promise<Ticker24HType[]> {
		const res = await httpBinanceClient.get<Ticker24HType[]>(
			`/ticker/24hr??symbols=${symbols.join(",")}`,
			{
				signal,
			},
		);

		return res.data;
	},
};
