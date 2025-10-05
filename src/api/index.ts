import { AccountCoinsBalance } from "./asset/transfer/accountCoinsBalance";
import { InferTransferList } from "./asset/transfer/interTransferList";
import { Nft } from "./nft";
import { Portfolio } from "./portfolio";
import { Ticker24h } from "./ticker24h";
import { Tickers } from "./tickers";
import { Transactions } from "./transactions";
import { WalletBalance } from "./walletBalance";

class Api {
	public inferTransferList = new InferTransferList();
	public accountCoinsBalance = new AccountCoinsBalance();
	public ticker24h = new Ticker24h();
	public tickers = new Tickers();
	public nft = new Nft();
	public portfolio = new Portfolio();
	public transactions = new Transactions();
	public walletBalance = new WalletBalance();
}

export const api = new Api();
export * from "./enums";
