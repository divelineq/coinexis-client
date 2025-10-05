import axios from "axios";
import type { PortfolioResponse } from "../dto";

export class Portfolio {
	public async getOne(address: string | null, signal: AbortSignal) {
		const res = await axios.get<PortfolioResponse>(
			`api/portfolio?wallet=${address}&filterSpam=true&liqmin=5000&accuracy=high&cache=false&stale=false&unlistedAssets=false`,
			{ signal },
		);

		return res.data;
	}
}
