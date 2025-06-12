import type { ManyCoinsType } from "@api";

export type CoinService = {
	coins: ManyCoinsType[];
	totalCoins: number;
};
