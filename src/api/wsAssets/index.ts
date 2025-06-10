import { useEffect, useRef, useState } from "react";

export function useWebSocket<T = unknown>(url: string) {
	const socketRef = useRef<WebSocket | null>(null);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const socket = new WebSocket(url);
		socketRef.current = socket;

		socket.onopen = () => {
			console.log("WebSocket открыт");
		};

		socket.onmessage = (event) => {
			const json = JSON.parse(event.data);
			setData(json.data);
		};

		socket.onerror = (error) => {
			console.error("WebSocket ошибка", error);
		};

		socket.onclose = () => {
			console.log("WebSocket закрыт");
		};

		return () => {
			socket.close();
		};
	}, [url]);

	return {
		data,
		send: (msg: object) => socketRef.current?.send(JSON.stringify(msg)),
	};
}
