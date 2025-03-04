import type React from "react";
import { useEffect, useState } from "react";
import { LineChart } from "./Chart";

export type Trade = {
	e: string; //? тип события
	E: number; //? время события
	s: string; //? торговая пара (символ)
	t: number; //? идентификатор сделки
	p: string; //? цена сделки
	q: string; //? количество
	b: number; //? ID ордера покупателя
	a: number; //? ID ордера продавца
	T: number; //? время сделки
	m: boolean; //? является ли покупатель маркет-мейкером
	M: boolean; //? игнорируется
};

const BinanceTrades: React.FC = () => {
	const [trades, setTrades] = useState<Trade[]>([]);

	console.log(trades, "trades");

	useEffect(() => {
		const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

		ws.onopen = () => {
			console.log("WebSocket соединение открыто");
		};

		ws.onmessage = (event) => {
			try {
				const trade: Trade = JSON.parse(event.data);

				setTrades((prev) => [+trade.p, ...prev]);
			} catch (err) {
				console.error("Ошибка парсинга данных:", err);
			}
		};

		ws.onerror = (error) => {
			console.error("Ошибка WebSocket:", error);
		};

		ws.onclose = () => {
			console.log("WebSocket соединение закрыто");
		};

		return () => {
			ws.close();
		};
	}, []);

	return (
		<div>
			<LineChart trades={trades} />
		</div>
	);
};

export default BinanceTrades;
