import { type PortfolioService, portfolioService } from "@service";
import { useQuery } from "@tanstack/react-query";

export function usePortfolio(address: string | null) {
	return useQuery<PortfolioService>({
		queryKey: ["wallet-portfolio", address],
		queryFn: ({ signal }) => portfolioService.getPortfolio(address, signal),
		enabled: !!address,
	});
}
