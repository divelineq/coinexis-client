type Contracts = {
  address: string;
  blockchain: string;
  blockchainId: string;
  decimals: string;
};

export type Api = {
  ath: number;
  atl: number;
  circulating_supply: number;
  contracts: Contracts[];
  decimals: number;
  id: number;
  is_listed: boolean;
  liquidity: number;
  logo: string;
  market_cap: number;
  market_cap_diluted: number;
  name: string;
  off_chain_volume: number;
  price: number;
  price_change_1h: number;
  price_change_1m: number;
  price_change_1y: number;
  price_change_7d: number;
  price_change_24h: number;
  rank: number;
  symbol: string;
  total_supply: string;
  volume: number;
  volume_7d: number;
  volume_change_24h: number;
}

export type History = {
	name: string;
	symbol: string;
	price_history: [number, number][];
};