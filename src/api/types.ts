
export type Api = {
  id: number;
  logo: string;
  price: number;
  price_change_1h: number;
  price_change_1m: number;
  price_change_1y: number;
  price_change_7d: number;
  price_change_24h: number;
}

export type History = {
	name: string;
	symbol: string;
	price_history: [number, number][];
};