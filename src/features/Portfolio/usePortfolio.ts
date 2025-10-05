import { api } from "@api";
import { useQuery } from "@tanstack/react-query";

export function usePortfolio(address: string | null) {
	return useQuery({
		queryKey: ["wallet-portfolio", address],
		queryFn: ({ signal }) => api.portfolio.getOne(address, signal),
		select: (data) => ({
			portfolio: {
				...data,
				assets: data.assets
					.filter((asset) => asset.token_balance > 0)
					.sort((a, b) => b.estimated_balance - a.estimated_balance),
			},
			totalPrice: data.assets
				.reduce((acc, val) => acc + val.estimated_balance, 0)
				.toFixed(2),
		}),
		enabled: !!address,
	});
}
