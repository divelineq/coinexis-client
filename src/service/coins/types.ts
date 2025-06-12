import type { ManyCoinTypes } from "@api";

export type CoinService = {
	coins: ManyCoinTypes[];
	totalCoins: number;
};
