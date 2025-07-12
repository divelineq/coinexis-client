import { type HistoryType, historyApi } from "@api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useHistory(
	id: number,
	from: number,
	to: number,
	period: string,
) {
	return useQuery<HistoryType>({
		queryKey: ["history", id],
		queryFn: ({ signal }) =>
			historyApi.getHistory(period, signal, id, from, to),
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		refetchInterval: 30_000,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
