import { httpModulaClient } from "../httpClient";
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

export class CoinsApi {
	private getAuthHeaders() {
		return {
			Authorization: `Bearer ${API}`,
		};
	}

	public async getMany(
		signal: AbortSignal,
		fields?: string,
	): Promise<ManyCoinsType[]> {
		const params = new URLSearchParams();
		if (fields) {
			params.append("fields", fields);
		}

		const response = await httpModulaClient.get<{ data: ManyCoinsType[] }>(
			`/all?${params.toString()}`,
			{
				headers: this.getAuthHeaders(),
				signal,
			},
		);

		return response.data.data;
	}

	public async getOne(name: string, signal: AbortSignal): Promise<OneCoinType> {
		const response = await httpModulaClient.get<{ data: OneCoinType }>(
			`/market/data?asset=${name}`,
			{
				headers: this.getAuthHeaders(),
				signal,
			},
		);

		return response.data.data;
	}

	public async getSortedCoins(
		signal: AbortSignal,
		limit: number | null,
		offset: number,
		sortBy: QuerySortBy = QuerySortBy.MarketCap,
	): Promise<SortedCoinsType[]> {
		const query = new URLSearchParams({
			sortBy,
			offset: offset.toString(),
		});

		if (limit !== null) {
			query.append("limit", limit.toString());
		}

		const response = await httpModulaClient.get<SortedCoinsType[]>(
			`/market/query?${query.toString()}`,
			{
				headers: this.getAuthHeaders(),
				signal,
			},
		);

		return response.data;
	}
}
