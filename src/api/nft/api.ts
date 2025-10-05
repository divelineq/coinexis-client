import axios from "axios";
import type { WalletNFTsResponse } from "../dto";

export class Nft {
	public async getMany(
		wallet: string | null,
		signal: AbortSignal,
		limit: number,
		offset: number,
	) {
		const res = await axios.get<WalletNFTsResponse>(
			`api/nfts?offset=${offset}&limit=${limit}&wallet=${wallet}&pagination=true`,
			{ signal },
		);

		return res.data;
	}
}
