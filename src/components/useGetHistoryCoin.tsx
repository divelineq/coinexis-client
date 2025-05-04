import axios from "axios";
import { useEffect, useState } from "react";

type History = {
	name: string;
	symbol: string;
	price_history: [number, number][];
};

export function useGetHistoryCoin(intervalMs: number, currency: string) {
	const [value, setValue] = useState<History | []>([]);

	useEffect(() => {
		// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
		// biome-ignore lint/style/useConst: <explanation>
		let timerId;

		const fetchBitcoinData = async () => {
			try {
				const response = await axios.get(
					`https://production-api.mobula.io/api/1/market/history?asset=${currency}&from=1697648158`,
				);
				setValue(response.data.data);
			} catch (error) {
				console.error("Ошибка:", error);
			}
		};

		fetchBitcoinData();
		timerId = setInterval(fetchBitcoinData, intervalMs);

		return () => clearInterval(timerId);
	}, [intervalMs, currency]);

	return value as History;
}
