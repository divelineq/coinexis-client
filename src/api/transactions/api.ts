import { httpModulaClient } from "../../api/httpClient";
import type { SmartTransactions } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export const transactionsApi = {
	async getMany(address: string | null, limit: number, offset: number) {
		const res = await httpModulaClient.get<SmartTransactions>(
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
