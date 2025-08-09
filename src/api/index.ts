import { HistoryApi } from "./history";
import { NftApi } from "./nft";
import { PortfolioApi } from "./portfolio";
import { Ticker24hApi } from "./ticker24h";
import { TickersApi } from "./tickers";
import { TransactionsApi } from "./transactions";

class Api {
	public ticker24h = new Ticker24hApi();
	public tickers = new TickersApi();
	public nft = new NftApi();
	public history = new HistoryApi();
	public portfolio = new PortfolioApi();
	public transactions = new TransactionsApi();
}

export const api = new Api();
export * from "./enums";
export * from "./types";
