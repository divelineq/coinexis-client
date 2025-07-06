import { httpClient } from "../httpClient";
import type { HistoryType } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export const historyApi = {
	async getHistory(
		period: string,
		signal: AbortSignal,
		id: number | null,
		from: number,
		to: number,
	) {
		const res = await httpClient.get<{ data: HistoryType }>(
			`/market/history?period=${period}&id=${id}&from=${from}&to=${to}`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data.data;
	},
};
