import { CoinsApi } from "./coins";
import { NftApi } from "./nft";
import { TickersApi } from "./tickers";

export * from "./coins";
export * from "./history";
export * from "./nft";
export * from "./portfolio";
export * from "./sparkline";
export * from "./ticker24h";
export * from "./tickerPrice";
export * from "./tickers";
export * from "./transactions";
export * from "./types";

class Api {
	public tickers = new TickersApi();
	public coins = new CoinsApi();
	public nft = new NftApi();
}

export const api = new Api();
