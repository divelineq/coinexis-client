import axios from "axios";
import type { SmartTransactions } from "./types";

export class Transactions {
	public async getMany(
		wallet: string | null,
		limit: number,
		offset: number,
		signal: AbortSignal,
	) {
		const res = await axios.get<SmartTransactions>(
			`api/transactions?wallet=${wallet}&limit=${limit}&offset=${offset}`,
			{ signal },
		);

		return res.data;
	}
}
