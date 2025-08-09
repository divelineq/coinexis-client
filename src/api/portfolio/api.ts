import { httpModulaClient } from "../httpClient";
import type { PortfolioType } from "../types/portfolio";

const API = import.meta.env.VITE_API_KEY;

export class PortfolioApi {
	public async getOne(address: string | null, signal: AbortSignal) {
		const res = await httpModulaClient.get<{ data: PortfolioType }>(
			`/wallet/portfolio?wallet=${address}&filterSpam=true&liqmin=5000&accuracy=high&cache=false&stale=false&unlistedAssets=false`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data.data;
	}
}
