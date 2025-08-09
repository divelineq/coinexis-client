import { api } from "@api";
import type { PortfolioService } from "./types";

export const portfolioService = {
	async getPortfolio(
		address: string | null,
		signal: AbortSignal,
	): Promise<PortfolioService> {
		const portfolio = await api.portfolio.getOne(address, signal);

		return {
			portfolio,
			totalPrice: portfolio.assets
				.reduce((acc, val) => acc + val.estimated_balance, 0)
				.toFixed(2),
		};
	},
};
