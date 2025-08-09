import { api } from "@api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ServiceOutput } from "./ValidationSchema";
import { getNFTMetadata } from "./getNftMetadata";

export function useNft(address: string | null, offset: number, limit: number) {
	return useQuery<ServiceOutput>({
		queryKey: ["nft", address, offset, limit],
		queryFn: async ({ signal }) => {
			const res = await api.nft.getMany(address, signal, limit, offset);

			const meta = await Promise.all(
				res.data.map(async (data) => {
					const metadata = await getNFTMetadata(data.token_uri);

					return {
						...data,
						...metadata,
					};
				}),
			);

			return {
				data: meta,
				pagination: res.pagination,
			};
		},
		enabled: !!address,
		placeholderData: keepPreviousData,
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
	});
}
