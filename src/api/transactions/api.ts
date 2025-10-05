import axios from "axios";
import type { SmartTransactionsResponse } from "../dto";

export class Transactions {
	public async getMany(
		wallet: string | null,
		limit: number,
		offset: number,
		signal: AbortSignal,
	) {
		const res = await axios.get<SmartTransactionsResponse>(
			`api/transactions?wallet=${wallet}&limit=${limit}&offset=${offset}`,
			{ signal },
		);

		return res.data;
	}
}
