import type { QuerySortBy } from "@api";
import { type QueryCoinsService, coinService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GC_TIME_DEFAULT, STALE_TIME_DEFAULT } from "../consts";

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
		staleTime: STALE_TIME_DEFAULT,
		gcTime: GC_TIME_DEFAULT,
	});
}
