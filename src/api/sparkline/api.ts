import { httpClient } from "../httpClient";
import type { SparklineType } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export const sparklineApi = {
	async getSparkline(signal: AbortSignal, id: number): Promise<SparklineType> {
		const res = await httpClient.get<{ data: SparklineType }>(
			`/market/sparkline?id=${id}&timeFrame=7d&png=true`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data.data;
	},
};
