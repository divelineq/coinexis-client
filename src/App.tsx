"use client";

import { Currency } from "./components/Currency";
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

const App = () => {
	return (
		<div>
			<Header />
			{ALL_COIN.map((coin) => (
				<Currency key={coin} currency={coin} />
			))}
			{/* <CurrencyChart currency="Bitcoin" /> */}
		</div>
	);
};

export { App };
