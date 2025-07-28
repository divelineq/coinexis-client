import { api } from "@api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type Props = {
	category: string;
	symbol?: string;
	baseCoin?: string;
	expDate?: string;
};

export function useQueryCoins(params: Props) {
	return useQuery({
		queryKey: ["coins", params.category],
		queryFn: ({ signal }) => api.tickers.getTickers(params, signal),
		placeholderData: keepPreviousData,
		select: (data) => ({
			...data,
			total: data.result.list.length,
			result: {
				...data.result,
				list: data.result.list.sort(
					(a, b) => Number(b.turnover24h) - Number(a.turnover24h),
				),
			},
		}),
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
