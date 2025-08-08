export type Level = [string, string];

export type OrderbookType = {
	bids: Level[];
	asks: Level[];
};

export type OrderbookDto = {
	a: Level[];
	b: Level[];
	s: string;
	seq: number;
	u: number;
};

export interface WsKlineType {
	conn_id?: string;
	op?: string;
	ret_smg?: string;
	success?: string;
	type?: string;
	topic?: string;
	ts?: number;
	data?: {
		close: string; // закрытие
		confirm: boolean; // подтверждение свечи (bool)
		end: number; // время конца свечи (timestamp в мс)
		high: string; // максимум
		interval: string; // интервал, например "1" (в минутах или другом формате)
		low: string; // минимум
		open: string; // открытие
		start: number; // время начала свечи (timestamp в мс)
		timestamp: number; // время получения (timestamp в мс)
		turnover: string; // оборот
		volume: string;
	}[];
}
