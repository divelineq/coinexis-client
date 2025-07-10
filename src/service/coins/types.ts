import type { ManyCoinsType, SortedCoinsType } from "@api";

export type CoinsService = {
	data: ManyCoinsType[];
	total: number;
};

export type SortedCoinsServiceResponse = {
	data: SortedCoinsType[];
	total: number;
};
