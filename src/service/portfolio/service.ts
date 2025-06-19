import { portfolioApi } from "@api";
import type { PortfolioService } from "./types";

export const portfolioService = {
	async getPortfolio(
		address: string | null,
		signal: AbortSignal,
	): Promise<PortfolioService> {
		const portfolio = await portfolioApi.getOne(address, signal);

		return {
			portfolio: {
				...portfolio,
				assets: portfolio.assets.filter((asset) => asset.token_balance > 0),
			},
			totalPrice: portfolio.assets
				.reduce((acc, val) => acc + val.estimated_balance, 0)
				.toFixed(2),
		};
	},
};
