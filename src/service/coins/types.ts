import type { ManyCoinsType, SortedCoinsType } from "@api";

export type CoinsService = {
	coins: ManyCoinsType[];
	totalCoins: number;
};

export type QueryCoinsService = {
	queryCoins: SortedCoinsType[];
	lengthCoins: number;
};
