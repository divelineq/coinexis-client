import type { NftMetadata } from "./types";

const IPFS_GATEWAYS = [
	"https://ipfs.io/ipfs/",
	"https://cloudflare-ipfs.com/ipfs/",
	"https://gateway.pinata.cloud/ipfs/",
	"https://dweb.link/ipfs/",
	"https://cf-ipfs.com/ipfs/",
	"https://infura-ipfs.io/ipfs/",
	"https://nftstorage.link/ipfs/",
	"https://4everland.io/ipfs/",
	"https://w3s.link/ipfs/",
];

function fetchWithTimeout(url: string, timeout = 10_000, signal?: AbortSignal) {
	return new Promise<Response>((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error("Timeout exceeded"));
		}, timeout);

		fetch(url, { signal })
			.then((res) => {
				clearTimeout(timer);
				resolve(res);
			})
			.catch((error: Error) => {
				clearTimeout(timer);
				reject(error);
			});
	});
}

function convertIpfsToHttp(ipfsUrl: string, gatewayIndex = 0): string {
	if (!ipfsUrl.startsWith("ipfs://")) {
		return ipfsUrl;
	}

	const hash = ipfsUrl.slice(7);

	return IPFS_GATEWAYS[gatewayIndex] + hash;
}

export async function fetchMetadataNft(
	url: string | undefined,
	signal?: AbortSignal,
): Promise<NftMetadata | undefined> {
	if (!url) return undefined;

	const httpUri = url.startsWith("ipfs://") ? convertIpfsToHttp(url) : url;

	try {
		const res = await fetchWithTimeout(httpUri, 10_000, signal);

		if (!res.ok) {
			console.warn(
				`Failed to fetch metadata from ${httpUri}, status: ${res.status}`,
			);
			return undefined;
		}

		return await res.json();
	} catch (error) {
		console.warn(`Error fetching metadata from ${httpUri}:`, error);
		return undefined;
	}
}
