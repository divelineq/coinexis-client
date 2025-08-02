import { useEffect, useRef, useState } from "react";
import type { OrderbookType } from "../types";
import { applyUpdates } from "./applyUpdates";

export function useOrderbook(symbol: string, depth: number) {
	const [orderbook, setOrderbook] = useState<OrderbookType>({
		bids: [],
		asks: [],
	});
	const lastURef = useRef<number | null>(null);
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");
		wsRef.current = ws;

		ws.onopen = () => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(
					JSON.stringify({
						op: "subscribe",
						args: [`orderbook.${depth}.${symbol}`],
					}),
				);
			}
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);

			const { type, data } = message;

			if (type === "snapshot") {
				setOrderbook({ bids: data.b, asks: data.a });
			}

			if (type === "delta") {
				setOrderbook((prev) => {
					const updatedBids = applyUpdates(prev.bids, data.b, true);
					const updatedAsks = applyUpdates(prev.asks, data.a, false);
					lastURef.current = data.u;
					return {
						bids: updatedBids,
						asks: updatedAsks,
					};
				});
			}
		};

		ws.onerror = (err) => {
			console.error("WebSocket error", err);
		};

		ws.onclose = () => {
			console.info("Disconnected");
		};

		return () => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(
					JSON.stringify({
						op: "unsubscribe",
						args: [`orderbook.${depth}.${symbol}`],
					}),
				);
			}

			ws.close();
		};
	}, []);

	return orderbook;
}
