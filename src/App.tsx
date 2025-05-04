"use client";

import { InfoCurrency } from "./components/Currency";
import { CurrencyChart } from "./components/CurrencyChart";
import { Header } from "./components/Header";

const ALL_COIN = [
	"bitcoin",
	"ethereum",
	"bnb",
	"xrp",
	"toncoin",
	"pepe",
	"tether",
	"dogecoin",
	"litecoin",
	"solana",
	"polkadot",
	"tron",
	"cardano",
	"avalanche",
	"chainlink",
	"uniswap",
	"stellar",
	"monero",
	"algorand",
	"aave",
];

//TODO: сделать список валют которые очень быстро поднимаются и падают
//TODO: сделать переход на определенную валюту с большим графиком

const App = () => {
	return (
		<div>
			<Header />
			{ALL_COIN.map((coin) => (
				<InfoCurrency key={coin} currency={coin} />
			))}
			<CurrencyChart currency="Bitcoin" />
		</div>
	);
};

export { App };
