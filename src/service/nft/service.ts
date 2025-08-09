import { api } from "@api";
import axios from "axios";
import type { NftMetadata, ServiceOutput } from "./types";

async function getNFTMetadata(tokenUri: string): Promise<NftMetadata | null> {
	try {
		let url = tokenUri;
		if (tokenUri.startsWith("ipfs://")) {
			url = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
		}

		const response = await axios.get(url, { timeout: 1000 });
		const metadata = response.data;

		if (metadata.image?.startsWith("ipfs://")) {
			metadata.image = metadata.image.replace(
				"ipfs://",
				"https://ipfs.io/ipfs/",
			);
		}

		return metadata;
	} catch {
		return null;
	}
}

export const nftService = {
	async getNft(
		offset: number,
		limit: number,
		address: string | null,
		signal: AbortSignal,
	): Promise<ServiceOutput> {
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
};
