import type { OhlcData, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

interface Props {
	interval: string;
	symbol: string;
}

export function useWsKline({ interval, symbol }: Props): OhlcData {
	const [kline, setKline] = useState<OhlcData | null>(null);
	const wsRef = useRef<WebSocket | null>(null);
	const topic = `kline.${interval}.${symbol}`;
	const klineRef = useRef<OhlcData | null>(null);

	useEffect(() => {
		const ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");
		wsRef.current = ws;

		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					op: "subscribe",
					args: [topic],
				}),
			);
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);

			if (
				message.topic !== topic ||
				!message?.data ||
				message?.data.length === 0
			) {
				return;
			}

			const upendKline: OhlcData = {
				time: Math.floor(message.data[0].start / 1000) as UTCTimestamp,
				open: Number(message.data[0].open),
				high: Number(message.data[0].high),
				low: Number(message.data[0].low),
				close: Number(message.data[0].close),
			};

			if (klineRef.current === upendKline) {
				return;
			}

			setKline(upendKline);
			klineRef.current = upendKline;
		};

		ws.onerror = (err) => {
			console.error("WebSocket error", err);
		};

		ws.onclose = () => {
			console.info("Disconnected");
		};

		return () => {
			if (wsRef.current) {
				if (wsRef.current.readyState === WebSocket.OPEN) {
					wsRef.current.send(
						JSON.stringify({
							op: "unsubscribe",
							args: [topic],
						}),
					);
				}

				wsRef.current.close();
				wsRef.current = null;
			}
		};
	}, []);

	return kline as OhlcData;
}
