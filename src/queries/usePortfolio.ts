import { MANY_PORTFOLIO_VALIDATION_SHEMA } from "@api";
import { type PortfolioService, portfolioService } from "@service";
import { useMutation } from "@tanstack/react-query";

export function usePortfolio() {
	return useMutation<PortfolioService, Error, string>({
		mutationKey: ["wallet-portfolio"],
		mutationFn: async (adress: string) => {
			const res = await portfolioService.getPortfolio(adress);

			const validate = MANY_PORTFOLIO_VALIDATION_SHEMA.safeParse(res.portfolio);

			if (!validate.success) {
				throw new Error(validate.error.message);
			}

			return res;
		},
	});
}
