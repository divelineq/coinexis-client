import type { DefaultResponse, TickersValidationType } from "@api";
import axios from "axios";
import qs from "query-string";

type Params = {
	category: string;
	symbol?: string;
	baseCoin?: string;
	expDate?: string;
};

export class TickersApi {
	public async getTickers(
		params: Params,
		signal: AbortSignal,
	): Promise<DefaultResponse<TickersValidationType>> {
		const query = qs.stringify(params);

		const res = await axios.get(`/api/tickers?${query}`, { signal });

		return res.data;
	}
}
