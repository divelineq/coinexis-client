import { httpClient } from "../../api/httpClient";
import type { SmartTransactions } from "./types";

const API = import.meta.env.VITE_API_KEY;

export const transactionsApi = {
	async getMany(address: string, limit: number, offset: number) {
		//TODO: допилить чтобы можно было передавать опции тут есть серверная пагинация
		const res = await httpClient.get<SmartTransactions>(
			`/wallet/transactions?wallet=${address}&limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
			},
		);

		return res.data;
	},
};
