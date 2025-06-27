import { httpClient } from "../httpClient";
import type { ManyCoinsType, OneCoinType } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export const coinApi = {
	async getMany(
		signal: AbortSignal,
		fields?: string,
	): Promise<ManyCoinsType[]> {
		const params = new URLSearchParams();

		if (fields) {
			params.append("fields", fields);
		}

		const res = await httpClient.get<{ data: ManyCoinsType[] }>(
			`/all?${params.toString()}`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data.data;
	},

	async getOne(name: string, signal: AbortSignal): Promise<OneCoinType> {
		const res = await httpClient.get<{ data: OneCoinType }>(
			`/market/data?asset=${name}`,
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
