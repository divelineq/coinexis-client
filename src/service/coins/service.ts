import type { OneCoinType, QuerySortBy } from "@api";
import { coinApi } from "../../api/coins/api";
import type { CoinsService, SortedCoinsServiceResponse } from "./types";

export const coinService = {
	async getCoins(signal: AbortSignal, fields: string): Promise<CoinsService> {
		const data = await coinApi.getMany(signal, fields);

		return {
			total: data.length,
			data,
		};
	},

	async getCoin(signal: AbortSignal, coin: string): Promise<OneCoinType> {
		return await coinApi.getOne(coin, signal);
	},

	async getSortedCoins(
		signal: AbortSignal,
		limit: number,
		offset: number,
		sortBy?: QuerySortBy,
	): Promise<SortedCoinsServiceResponse> {
		const [total, data] = await Promise.all([
			coinApi.getMany(signal, "id").then((res) => res.length),
			coinApi.getSortedCoins(signal, limit, offset, sortBy),
		]);

		return { total, data };
	},
};
