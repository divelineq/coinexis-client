import type { DefaultResponse } from "@api";
import axios from "axios";
import qs from "query-string";
import type { TickersSpotResponse } from "../dto";

type Params = {
	category: string;
	symbol?: string;
	baseCoin?: string;
	expDate?: string;
};

export class Tickers {
	public async getTickers(
		params: Params,
		signal: AbortSignal,
	): Promise<DefaultResponse<TickersSpotResponse>> {
		const query = qs.stringify(params);

		const res = await axios.get(`/api/tickers?${query}`, { signal });

		return res.data;
	}
}
