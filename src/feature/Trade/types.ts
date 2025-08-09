import type { Time } from "lightweight-charts";

export type Level = [string, string];

export type OrderbookType = {
	bids: Level[];
	asks: Level[];
};

export type OrderbookWsDto = {
	a: Level[];
	b: Level[];
	s: string;
	seq: number;
	u: number;
};

export type TickersWsDto = {
	highPrice24h: string;
	lastPrice: string;
	lowPrice24h: string;
	prevPrice24h: string;
	price24hPcnt: string;
	symbol: string;
	turnover24h: string;
	usdIndexPrice: string;
	volume24h: string;
};

export interface KlineWsDto {
	close: string; // закрытие
	confirm: boolean; // подтверждение свечи (bool)
	end: number; // время конца свечи (timestamp в мс)
	high: string; // максимум
	interval: string; // интервал, например "1" (в минутах или другом формате)
	low: string; // минимум
	open: string; // открытие
	start: Time; // время начала свечи (timestamp в мс)
	timestamp: Time; // время получения (timestamp в мс)
	turnover: string; // оборот
	volume: string;
}
