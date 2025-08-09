import { httpModulaClient } from "../httpClient";
import type { HistoryType } from "../types/history";

const API = import.meta.env.VITE_API_KEY;

export class HistoryApi {
	public async getHistory(
		period: string,
		signal: AbortSignal,
		id: number | null,
		from: number,
		to: number,
	) {
		const res = await httpModulaClient.get<{ data: HistoryType }>(
			`/market/history?period=${period}&id=${id}&from=${from}&to=${to}`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data.data;
	}
}
