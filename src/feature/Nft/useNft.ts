import { nftService } from "@service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ServiceOutput } from "src/service/nft/types";

export function useNft(address: string | null, offset: number, limit: number) {
	return useQuery<ServiceOutput>({
		queryKey: ["nft", address, offset, limit],
		queryFn: ({ signal }) => nftService.getNft(offset, limit, address, signal),
		enabled: !!address,
		placeholderData: keepPreviousData,
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
	});
}
