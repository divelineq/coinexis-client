import { httpClient } from "../httpClient";
import type { PortfolioType } from "./types";

const API = import.meta.env.VITE_API_KEY;

export const portfolioApi = {
	async getOne(adress: string) {
		const res = await httpClient.get<{ data: PortfolioType }>(
			`/wallet/portfolio?wallet=${adress}&filterSpam=true&liqmin=5000&accuracy=high&cache=false&stale=false&unlistedAssets=false`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
			},
		);

		return res.data.data;
	},
};
