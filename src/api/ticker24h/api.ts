import type { Ticker24HResponse } from "../dto";
import { httpBinanceClient } from "../httpClient";

export class Ticker24h {
	public async getOne(
		symbol: string,
		signal: AbortSignal,
	): Promise<Ticker24HResponse> {
		const res = await httpBinanceClient.get<Ticker24HResponse>(
			`/ticker/24hr?symbol=${symbol}`,
			{ signal },
		);

		return res.data;
	}

	public async getMany(
		symbols: string[],
		signal: AbortSignal,
	): Promise<Ticker24HResponse[]> {
		const res = await httpBinanceClient.get<Ticker24HResponse[]>(
			`/ticker/24hr??symbols=${symbols.join(",")}`,
			{ signal },
		);

		return res.data;
	}
}
