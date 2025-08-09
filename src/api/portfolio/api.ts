import axios from "axios";
import type { PortfolioType } from "../types/portfolio";

export class PortfolioApi {
	public async getOne(address: string | null, signal: AbortSignal) {
		const res = await axios.get<PortfolioType>(
			`api/portfolio?wallet=${address}&filterSpam=true&liqmin=5000&accuracy=high&cache=false&stale=false&unlistedAssets=false`,
			{ signal },
		);

		return res.data;
	}
}
