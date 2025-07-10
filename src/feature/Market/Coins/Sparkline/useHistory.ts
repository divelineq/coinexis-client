import { type HistoryType, historyApi } from "@api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const STALE_TIME_DEFAULT = 5 * 60 * 1000;
const GC_TIME_DEFAULT = 10 * 60 * 1000;

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
		staleTime: STALE_TIME_DEFAULT,
		gcTime: GC_TIME_DEFAULT,
	});
}
