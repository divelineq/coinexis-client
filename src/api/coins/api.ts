import { httpClient } from "../httpClient";
import type { ManyCoinsType, OneCoinType, SortedCoinsType } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export enum QuerySortBy {
	Liquidity = "liquidity",
	MarketCap = "market_cap",
	OffChainVolume = "off_chain_volume",
	PriceChange1h = "price_change_1h",
	PriceChange7d = "price_change_7d",
	PriceChange24h = "price_change_24h",
	Price = "price",
	Volume = "volume",
}

export enum QuerySortOrder {
	Asc = "asc",
	Desc = "desc",
}

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
		offset: number,
		sortBy: QuerySortBy = QuerySortBy.MarketCap,
	): Promise<SortedCoinsType[]> {
		const res = await httpClient.get<SortedCoinsType[]>(
			`/market/query?sortBy=${sortBy}&limit=${limit}&offset=${offset}`,
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
