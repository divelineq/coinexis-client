import type { OhlcData } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { applyUpdates } from "./applyUpdates";
import type { OrderbookType } from "./types";

type Props = {
	topics: string[];
};

export function useTradeSocket({ topics }: Props) {
	//TODO: сделать reducer
	const [kline, setKline] = useState<OhlcData | null>(null);
	const [tickers, setTickers] = useState<any>(null);
	const [orderbook, setOrderbook] = useState<OrderbookType>({
		bids: [],
		asks: [],
	});

	const wsRef = useRef<WebSocket | null>(null);
	const klineRef = useRef<any>(null);
	const orderbookRef = useRef<any>(null);
	const tickersRef = useRef<any>(null);
	const hasSnapshotRef = useRef<boolean>(false);
	const orderbookBufferRef = useRef<OrderbookType>({
		bids: [],
		asks: [],
	});

	useEffect(() => {
		const ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");
		wsRef.current = ws;

		const interval = setInterval(() => {
			if (!klineRef.current && !orderbookRef.current && !tickersRef.current)
				return;
			setTickers(tickersRef.current);

			setKline({
				time: klineRef.current?.start,
				open: Number(klineRef.current?.open),
				high: Number(klineRef.current?.high),
				low: Number(klineRef.current?.low),
				close: Number(klineRef.current?.close),
			});

			setOrderbook({
				bids: orderbookBufferRef.current.bids,
				asks: orderbookBufferRef.current.asks,
			});
		}, 1000);

		ws.onopen = () => {
			for (const topic of topics) {
				ws.send(
					JSON.stringify({
						op: "subscribe",
						args: [topic],
					}),
				);
			}
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);

			if (!message?.topic) {
				return;
			}

			switch (message.topic.split(".")[0]) {
				case "kline":
					klineRef.current = message.data[0];
					break;
				case "tickers":
					tickersRef.current = message.data;
					document.title = `${message.data.symbol} | ${message.data.lastPrice}`;
					break;
				case "orderbook": {
					const { type, data } = message;

					if (type === "snapshot") {
						orderbookBufferRef.current = { bids: data.b, asks: data.a };
						hasSnapshotRef.current = true;
						setOrderbook({ bids: data.b, asks: data.a });
					}

					if (type === "delta") {
						const base = hasSnapshotRef.current
							? orderbookBufferRef.current
							: orderbook;
						const updatedBids = applyUpdates(base.bids, data.b, true);
						const updatedAsks = applyUpdates(base.asks, data.a, false);
						orderbookBufferRef.current = {
							bids: updatedBids,
							asks: updatedAsks,
						};
					}

					break;
				}
			}
		};

		ws.onerror = (err) => {
			if (
				ws.readyState === WebSocket.CLOSING ||
				ws.readyState === WebSocket.CLOSED
			) {
				return;
			}

			console.error("WebSocket error", err);
		};

		ws.onclose = () => {
			console.info("Disconnected");
		};

		return () => {
			clearInterval(interval);

			if (ws.readyState === WebSocket.OPEN) {
				for (const topic of topics) {
					ws.send(
						JSON.stringify({
							op: "unsubscribe",
							args: [topic],
						}),
					);
				}
			}

			ws.close();
		};
	}, [topics]);

	return {
		kline,
		orderbook,
		tickers,
	};
}
