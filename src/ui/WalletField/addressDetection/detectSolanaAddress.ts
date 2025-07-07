import bs58 from "bs58";
import { DetectedNetwork } from "../enums";
import type { AddressDetectionResult } from "./index";

export function validateSolanaAddress(
	address: string,
): AddressDetectionResult | null {
	if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(address)) {
		return null;
	}

	try {
		const decoded = bs58.decode(address);
		if (decoded.length === 32) {
			return {
				isValid: true,
				network: DetectedNetwork.Solana,
			};
		}
	} catch {}

	return null;
}
