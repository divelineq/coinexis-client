import { api } from "@api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ServiceOutput } from "./ValidationSchema";

export function useNft(wallet: string | null, offset: number, limit: number) {
	return useQuery<ServiceOutput>({
		queryKey: ["nft", wallet, offset, limit],
		queryFn: ({ signal }) => api.nft.getMany(wallet, signal, limit, offset),
		enabled: !!wallet,
		placeholderData: keepPreviousData,
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
	});
}
