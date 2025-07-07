import { type PortfolioService, portfolioService } from "@service";
import { useQuery } from "@tanstack/react-query";

export function usePortfolio(address: string | null) {
	return useQuery<PortfolioService>({
		queryKey: ["wallet-portfolio", address],
		queryFn: ({ signal }) => portfolioService.getPortfolio(address, signal),
		select: (data) => ({
			...data,
			portfolio: {
				...data.portfolio,
				assets: data.portfolio.assets
					.filter((asset) => asset.token_balance > 0)
					.sort((a, b) => b.estimated_balance - a.estimated_balance),
			},
		}),
		enabled: !!address,
	});
}
