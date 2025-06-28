import type {
	OneCoinType,
	QuerySortByType,
	QuerySortOrderType,
	SortedCoinsType,
} from "@api";
import { coinApi } from "../../api/coins/api";
import type { CoinService } from "./types";

export const coinService = {
	async getCoins(signal: AbortSignal): Promise<CoinService> {
		const coins = await coinApi.getMany(
			signal,
			"id,name,logo,price,price_change_1h,price_change_24h,price_change_7d,price_change_1m,price_change_1y,volume",
		);

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
		limit: number | null,
		offset?: number,
		sortBy?: QuerySortByType,
		sortOrder?: QuerySortOrderType,
	): Promise<SortedCoinsType> {
		return await coinApi.getSortedCoins(
			signal,
			limit,
			offset,
			sortBy,
			sortOrder,
		);
	},
};
