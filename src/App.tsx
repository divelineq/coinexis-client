"use client";

import { useEffect, useState } from "react";
import { Header } from "./components/Header";

type Contracts = {
	address: string;
	blockchain: string;
	blockchainId: string;
	decimals: string;
};

type Api = {
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
};

const App = () => {
	const [bitcoin, setBitcoin] = useState<Api | null>(null);

	useEffect(() => {
		const fetchBitcoinData = async () => {
			try {
				const response = await fetch(
					"https://production-api.mobula.io/api/1/market/data?asset=bitcoin",
				);
				const data = await response.json();
				setBitcoin(data.data);

				fetchBitcoinData();
			} catch (error) {
				console.error("Ошибка:", error);
			}
		};

		fetchBitcoinData();
	}, []);

	console.log(bitcoin);

	return (
		<div>
			<Header />
			<div className="flex gap-4 stack-h p-2 ">
				<div className="flex gap-2">
					<img src={bitcoin?.logo} className="w-6" aria-label="logo" />
					{bitcoin?.name}
				</div>
				<p>{`$${bitcoin?.price.toFixed(2)}`}</p>
				<p>{`1h: ${bitcoin?.price_change_1h.toFixed(3)}`}</p>
				<p>{`24h: ${bitcoin?.price_change_24h.toFixed(3)}`}</p>
				<p>{`7d: ${bitcoin?.price_change_7d.toFixed(3)}`}</p>
				<p>{`1m: ${bitcoin?.price_change_1m.toFixed(3)}`}</p>
				<p>{`1y: ${bitcoin?.price_change_1y.toFixed(3)}`}</p>
			</div>
		</div>
	);
};

export { App };
