import type { OneCoinType, QuerySortBy } from "@api";
import { coinApi } from "../../api/coins/api";
import type { CoinsService, QueryCoinsService } from "./types";

export const coinService = {
	async getCoins(signal: AbortSignal, fields: string): Promise<CoinsService> {
		const coins = await coinApi.getMany(signal, fields);

		return {
			coins,
			totalCoins: coins.length,
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
	): Promise<QueryCoinsService> {
		const [lengthCoins, queryCoins] = await Promise.all([
			coinApi.getMany(signal, "id").then((res) => res.length),
			coinApi.getSortedCoins(signal, limit, offset, sortBy),
		]);

		return { lengthCoins, queryCoins };
	},
};
