import { bech32 } from "bech32";
import { validate as validateBitcoinAddress } from "bitcoin-address-validation";
import bs58 from "bs58";
import { TronWeb } from "tronweb";
import { isAddress as isEthAddress } from "viem";

type DetectedNetwork =
	| "Aptos"
	| "Bitcoin"
	| "Cosmos"
	| "Ethereum"
	| "Solana"
	| "Sui"
	| "TRON"
	| "Unknown";

export interface AddressDetectionResult {
	isValid: boolean;
	network: DetectedNetwork;
	normalizedAddress?: string;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function validateAdress(raw: string): AddressDetectionResult {
	if (!raw || typeof raw !== "string") {
		return { isValid: false, network: "Unknown" };
	}

	const address = raw.trim();

	//* === Ethereum (EVM)
	if (/^0x[\dA-Fa-f]{40}$/.test(address) && isEthAddress(address)) {
		return {
			isValid: true,
			network: "Ethereum",
			normalizedAddress: address.toLowerCase(),
		};
	}

	//* === Solana
	if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
		try {
			const decoded = bs58.decode(address);
			if (decoded.length >= 32) {
				return {
					isValid: true,
					network: "Solana",
				};
			}
		} catch {}
	}

	//* === Bitcoin
	if (validateBitcoinAddress(address)) {
		return {
			isValid: true,
			network: "Bitcoin",
		};
	}

	//* === Tron
	if (/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address)) {
		try {
			if (TronWeb.isAddress(address)) {
				return {
					isValid: true,
					network: "TRON",
				};
			}
		} catch {}
	}

	//* === Cosmos
	if (/^cosmos1[\da-z]{38}$/.test(address)) {
		try {
			const { prefix } = bech32.decode(address);
			if (prefix === "cosmos") {
				return {
					isValid: true,
					network: "Cosmos",
				};
			}
		} catch {}
	}

	//* === Aptos
	if (/^0x[\dA-Fa-f]{64}$/.test(address)) {
		return {
			isValid: true,
			network: "Aptos",
			normalizedAddress: address.toLowerCase(),
		};
	}

	//* === Sui
	if (/^0x[\dA-Fa-f]{64,66}$/.test(address)) {
		return {
			isValid: true,
			network: "Sui",
			normalizedAddress: address.toLowerCase(),
		};
	}

	return {
		isValid: false,
		network: "Unknown",
	};
}
