import axios from "axios";
import type { SmartTransactions } from "../types/transactions";

export class TransactionsApi {
	public async getMany(wallet: string | null, limit: number, offset: number) {
		const res = await axios.get<SmartTransactions>(
			`api/transactions?wallet=${wallet}&limit=${limit}&offset=${offset}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		return res.data;
	}
}
