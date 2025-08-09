import { httpModulaClient } from "../httpClient";
import type { WalletNFTsResponse } from "./dto";

const API = import.meta.env.VITE_API_KEY;

export class NftApi {
	public async getMany(
		address: string | null,
		signal: AbortSignal,
		limit: number,
		offset: number,
	) {
		const res = await httpModulaClient.get<WalletNFTsResponse>(
			`/wallet/nfts?offset=${offset}&limit=${limit}&wallet=${address}&pagination=true`,
			{
				headers: {
					Authorization: `Bearer ${API}`,
				},
				signal,
			},
		);

		return res.data;
	}
}
