import { useEffect, useRef } from "react";

type WebSocketCallback = (
	channel: string,
	type: string | undefined,
	data: any,
) => void;

interface WebSocketOptions {
	enabled?: boolean;
	reconnect?: boolean;
	reconnectInterval?: number;
	maxReconnectAttempts?: number;
}

const useWebSocket = (
	channels: string[],
	callback: WebSocketCallback,
	options: WebSocketOptions = {},
) => {
	const { enabled = true } = options;

	// const ws = useRef<WebSocket | null>(null);
	const activeSubscriptions = useRef<Set<string>>(new Set());
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!enabled) return;

		const ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");

		ws.onopen = () => {
			for (const channel of channels) {
				if (!activeSubscriptions.current.has(channel)) {
					console.info(`Соединение по каналу ${channel}открыто`);
					ws.send(
						JSON.stringify({
							op: "subscribe",
							args: [channel],
						}),
					);
					activeSubscriptions.current.add(channel);
				}
			}
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);

			if (!message?.topic) {
				return;
			}

			callbackRef.current(message.topic, message.type, message.data);
		};

		ws.onerror = (error) => {
			if (
				ws.readyState === WebSocket.CLOSING ||
				ws.readyState === WebSocket.CLOSED
			) {
				return;
			}

			console.error("WebSocket error", error);
		};

		ws.onclose = () => {
			ws.close();
		};

		return () => {
			if (ws.readyState === WebSocket.OPEN) {
				for (const channel of channels) {
					console.info(`Соединение по каналу ${channel} закрыто`);
					ws.send(
						JSON.stringify({
							op: "unsubscribe",
							args: [channel],
						}),
					);
					activeSubscriptions.current.delete(channel);
				}

				ws.close();
			} else if (ws.readyState === WebSocket.CONNECTING) {
				ws.close();
			}
		};
	}, [channels, enabled]);
};

export { useWebSocket };
