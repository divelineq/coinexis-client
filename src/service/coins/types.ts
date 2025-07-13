import type { ManyCoinsType, SortedCoinsType } from "@api";

export type CoinsService = {
	data: ManyCoinsType[];
	total: number;
};

export type SortedCoinsServiceResponse = {
	data: SortedCoinsType[];
	total: number;
};

export type SortedCoinsWithHistoryServiceResponse = {
	data: (SortedCoinsType & { history: (number | undefined)[] })[];
	total: number;
};
