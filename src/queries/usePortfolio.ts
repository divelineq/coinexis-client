import { type PortfolioService, portfolioService } from "@service";
import { useMutation } from "@tanstack/react-query";

export function usePortfolio() {
	return useMutation<PortfolioService, Error, string>({
		mutationKey: ["wallet-portfolio"],
		mutationFn: (adress: string) => portfolioService.getPortfolio(adress),
	});
}
