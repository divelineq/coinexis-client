import { httpClient } from "../httpClient";
import type { ManyCoinsType, OneCoinType, SortedCoinsType } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export type QuerySortByType =
	| "liquidity"
	| "market_cap"
	| "off_chain_volume"
	| "price_change_1h"
	| "price_change_7d"
	| "price_change_24h"
	| "price"
	| "volume";

export type QuerySortOrderType = "asc" | "desc";

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

	async getSortedCoins(
		signal: AbortSignal,
		limit: number | null,
		offset?: number,
		sortBy: QuerySortByType = "volume",
		sortOrder: QuerySortOrderType = "asc",
	): Promise<SortedCoinsType> {
		const res = await httpClient.get<{ data: SortedCoinsType }>(
			`/market/query?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&offset=${offset ?? 0}`,
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
