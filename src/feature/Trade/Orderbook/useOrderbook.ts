import { useEffect, useRef, useState } from "react";
import type { OrderbookType } from "../types";
import { applyUpdates } from "./applyUpdates";

export function useOrderbook(symbol: string, depth: number) {
	const [orderbook, setOrderbook] = useState<OrderbookType>({
		bids: [],
		asks: [],
	});
	const wsRef = useRef<WebSocket | null>(null);
	const hasSnapshotRef = useRef<boolean>(false);
	const bufferRef = useRef<OrderbookType>({
		bids: [],
		asks: [],
	});

	useEffect(() => {
		const ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");
		wsRef.current = ws;

		const interval = setInterval(() => {
			if (!hasSnapshotRef.current) return;

			setOrderbook({
				bids: bufferRef.current.bids,
				asks: bufferRef.current.asks,
			});
		}, 1000);

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
				bufferRef.current = { bids: data.b, asks: data.a };
				hasSnapshotRef.current = true;
				setOrderbook({ bids: data.b, asks: data.a });
			}

			if (type === "delta") {
				const base = hasSnapshotRef.current ? bufferRef.current : orderbook;
				const updatedBids = applyUpdates(base.bids, data.b, true);
				const updatedAsks = applyUpdates(base.asks, data.a, false);
				bufferRef.current = {
					bids: updatedBids,
					asks: updatedAsks,
				};
			}
		};

		ws.onerror = (err) => {
			console.error("WebSocket error", err);
		};

		ws.onclose = () => {
			console.info("Disconnected");
		};

		return () => {
			clearInterval(interval);

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
	}, [symbol, depth]);

	return orderbook;
}
