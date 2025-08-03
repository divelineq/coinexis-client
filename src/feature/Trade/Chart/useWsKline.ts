import type { OhlcData, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

interface Props {
	interval: string;
	symbol: string;
}

interface WsKlineType {
	conn_id?: string;
	op?: string;
	ret_smg?: string;
	success?: string;
	type?: string;
	topic?: string;
	ts?: number;
	data?: {
		close: string; // закрытие
		confirm: boolean; // подтверждение свечи (bool)
		end: number; // время конца свечи (timestamp в мс)
		high: string; // максимум
		interval: string; // интервал, например "1" (в минутах или другом формате)
		low: string; // минимум
		open: string; // открытие
		start: number; // время начала свечи (timestamp в мс)
		timestamp: number; // время получения (timestamp в мс)
		turnover: string; // оборот
		volume: string;
	}[];
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
			const message: WsKlineType = JSON.parse(event.data);

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
			document.title = `${symbol} | ${upendKline.close}`;
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
