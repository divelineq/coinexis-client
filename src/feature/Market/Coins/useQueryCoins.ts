import type { QuerySortBy } from "@api";
import { type SortedCoinsServiceResponse, coinService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useQueryCoins(
	limit: number,
	offset: number,
	sortBy?: QuerySortBy,
) {
	return useQuery<SortedCoinsServiceResponse>({
		queryKey: ["coins", limit, offset],
		queryFn: ({ signal }) =>
			coinService.getSortedCoins(signal, limit, offset, sortBy),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchInterval: 30_000,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
