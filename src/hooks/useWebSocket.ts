import { useCallback, useEffect, useRef } from "react";

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
	const {
		enabled = true,
		reconnect = true,
		reconnectInterval = 3000,
		maxReconnectAttempts = 5,
	} = options;

	const ws = useRef<WebSocket | null>(null);
	const reconnectAttempts = useRef(0);
	const activeSubscriptions = useRef<Set<string>>(new Set());
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const getSubscriptionKey = useCallback((channel: string) => {
		return channel;
	}, []);

	const sendSubscriptions = useCallback(() => {
		if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

		for (const channel of channels) {
			const subKey = getSubscriptionKey(channel);

			if (!activeSubscriptions.current.has(subKey)) {
				ws.current?.send(
					JSON.stringify({
						op: "subscribe",
						args: [channel],
					}),
				);
				activeSubscriptions.current.add(subKey);
			}
		}
	}, [channels, getSubscriptionKey]);

	const handleMessage = useCallback((event: MessageEvent) => {
		try {
			const message = JSON.parse(event.data);

			if (message.data !== undefined) {
				callbackRef.current(message.topic, message.type, message.data);
			}
		} catch (error) {
			console.error("WebSocket message parsing error:", error);
		}
	}, []);

	const connect = useCallback(() => {
		if (!enabled) return;

		ws.current = new WebSocket("wss://stream.bybit.com/v5/public/spot");

		ws.current.onopen = () => {
			reconnectAttempts.current = 0;
			sendSubscriptions();
		};

		ws.current.onmessage = handleMessage;

		ws.current.onclose = () => {
			if (reconnect && reconnectAttempts.current < maxReconnectAttempts) {
				reconnectAttempts.current += 1;
				setTimeout(connect, reconnectInterval);
			}
		};

		ws.current.onerror = (error) => {
			if (
				ws.current?.readyState === WebSocket.CLOSING ||
				ws.current?.readyState === WebSocket.CLOSED
			) {
				return;
			}

			console.error("WebSocket error:", error);
		};
	}, [
		enabled,
		reconnect,
		reconnectInterval,
		maxReconnectAttempts,
		handleMessage,
		sendSubscriptions,
	]);

	useEffect(() => {
		if (ws.current?.readyState === WebSocket.OPEN) {
			sendSubscriptions();
		}
	}, [channels, sendSubscriptions]);

	useEffect(() => {
		if (enabled) {
			connect();
		} else if (ws.current) {
			ws.current.close();
			ws.current = null;
			activeSubscriptions.current.clear();
		}

		return () => {
			if (ws.current) {
				console.info("Closing WebSocket connection");
				for (const channel of channels) {
					ws.current?.send(
						JSON.stringify({ op: "unsubscribe", args: [channel] }),
					);
				}

				ws.current.close();
			}
		};
	}, [enabled, connect]);
};

export { useWebSocket };
