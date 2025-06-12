import { coinApi } from "../../api/coins";
import type { CoinService } from "./types";

export const coinService = {
	async getAllCoins(signal: AbortSignal): Promise<CoinService> {
		const coins = await coinApi.getMany(
			signal,
			"id,name,logo,price,price_change_1h,price_change_24h,price_change_7d,price_change_1m,price_change_1y,volume",
		);

		return {
			coins,
			totalCoins: coins.length,
		};
	},
};
