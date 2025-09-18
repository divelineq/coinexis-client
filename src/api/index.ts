import { Nft } from "./nft";
import { Portfolio } from "./portfolio";
import { Ticker24h } from "./ticker24h";
import { Tickers } from "./tickers";
import { Transactions } from "./transactions";
import { WalletBalance } from "./walletBalance";

class Api {
	public ticker24h = new Ticker24h();
	public tickers = new Tickers();
	public nft = new Nft();
	public portfolio = new Portfolio();
	public transactions = new Transactions();
	public walletBalance = new WalletBalance();
}

export const api = new Api();
export * from "./enums";
export * from "./types";
