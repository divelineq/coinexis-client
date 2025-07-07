import type { QuerySortBy } from "@api";
import { type QueryCoinsService, coinService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useQueryCoins(
	limit: number,
	offset: number,
	sortBy?: QuerySortBy,
) {
	return useQuery<QueryCoinsService>({
		queryKey: ["coins", limit, offset],
		queryFn: ({ signal }) =>
			coinService.getSortedCoins(signal, limit, offset, sortBy),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchInterval: 30_000,
	});
}
