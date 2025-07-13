import type { QuerySortBy } from "@api";
import {
	type SortedCoinsWithHistoryServiceResponse,
	coinService,
} from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useQueryCoinsWithHistory(
	limit: number,
	offset: number,
	period: string,
	sortBy?: QuerySortBy,
) {
	const to = Date.now();
	const from = to - 7 * 24 * 60 * 60 * 1000;

	return useQuery<SortedCoinsWithHistoryServiceResponse>({
		queryKey: ["coins", limit, offset, period],
		queryFn: ({ signal }) =>
			coinService.getSortedCoinsWithHistory(
				signal,
				limit,
				offset,
				period,
				from,
				to,
				sortBy,
			),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
