import { ticker24hApi } from "@api";
import { useQuery } from "@tanstack/react-query";

export function useTicker24H(coin: string) {
	return useQuery({
		queryKey: ["ticker24hApi"],
		queryFn: ({ signal }) => ticker24hApi.getOne(coin, signal),
		refetchInterval: 30_000,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}
