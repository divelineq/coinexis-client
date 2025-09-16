import { useCallback, useEffect, useRef } from "react";

type WebSocketCallback<T> = (
	channel: string,
	type: string | undefined,
	data: T,
) => void;

interface WebSocketOptions {
	enabled?: boolean;
}

export const useWebSocket = <T>(
	channels: string[],
	callback: WebSocketCallback<T>,
	options: WebSocketOptions = {},
) => {
	const cb = useCallback(callback, [callback]);
	const { enabled = true } = options;
	const wsRef = useRef<WebSocket | null>(null);
	const activeSubscriptions = useRef<Set<string>>(new Set());
	const callbackRef = useRef(cb);

	useEffect(() => {
		if (!enabled) return;

		const ws = new WebSocket("wss://stream-testnet.bybit.com/v5/public/spot");
		wsRef.current = ws;

		ws.onopen = () => {
			console.info("WebSocket соединение открыто");
			for (const channel of channels) {
				subscribeChannel(ws, channel, activeSubscriptions.current);
			}
		};

		ws.onmessage = (event) => {
			try {
				const message = JSON.parse(event.data);
				if (message?.topic) {
					callbackRef.current(message.topic, message.type, message.data);
				}
			} catch (error) {
				console.error("Ошибка парсинга сообщения WS:", error);
			}
		};

		ws.onerror = (error) => {
			if (wsRef.current?.readyState === WebSocket.OPEN) {
				console.error("WebSocket error", error);
			}
		};

		ws.onclose = () => {
			console.info("WebSocket соединение закрыто");
			activeSubscriptions.current.clear();
		};

		return () => {
			if (ws.readyState === WebSocket.OPEN) {
				for (const channel of activeSubscriptions.current) {
					unsubscribeChannel(ws, channel, activeSubscriptions.current);
				}
			}

			ws.close();
		};
	}, [enabled]);

	useEffect(() => {
		if (
			!enabled ||
			!wsRef.current ||
			wsRef.current.readyState !== WebSocket.OPEN
		) {
			return;
		}

		const ws = wsRef.current;

		const newChannels = channels.filter(
			(c) => !activeSubscriptions.current.has(c),
		);
		const removedChannels = [...activeSubscriptions.current].filter(
			(c) => !channels.includes(c),
		);

		for (const channel of newChannels) {
			subscribeChannel(ws, channel, activeSubscriptions.current);
		}

		for (const channel of removedChannels) {
			unsubscribeChannel(ws, channel, activeSubscriptions.current);
		}
	}, [channels, enabled]);
};

function subscribeChannel(
	ws: WebSocket,
	channel: string,
	activeSubscriptions: Set<string>,
) {
	ws.send(JSON.stringify({ op: "subscribe", args: [channel] }));
	activeSubscriptions.add(channel);
	console.info(`Подписка на канал: ${channel}`);
}

function unsubscribeChannel(
	ws: WebSocket,
	channel: string,
	activeSubscriptions: Set<string>,
) {
	ws.send(JSON.stringify({ op: "unsubscribe", args: [channel] }));
	activeSubscriptions.delete(channel);
	console.info(`Отписка от канала: ${channel}`);
}
