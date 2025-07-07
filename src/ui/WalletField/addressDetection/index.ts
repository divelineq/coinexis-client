import { isAddress } from "@solana/addresses";
import { bech32 } from "bech32";
import { validate as validateBitcoinAddress } from "bitcoin-address-validation";
import { TronWeb } from "tronweb";
import { isAddress as isEthAddress } from "viem";
import { DetectedNetwork } from "../enums";

export interface AddressDetectionResult {
	isValid: boolean;
	network: DetectedNetwork;
	normalizedAddress?: string;
}

export function addressDetection(raw: string): AddressDetectionResult {
	if (!raw || typeof raw !== "string") {
		return { isValid: false, network: DetectedNetwork.Unknown };
	}

	const address = raw.trim();

	//* === Ethereum (EVM)
	if (/^0x[\dA-Fa-f]{40}$/.test(address) && isEthAddress(address)) {
		return {
			isValid: true,
			network: DetectedNetwork.Ethereum,
			normalizedAddress: address.toLowerCase(),
		};
	}

	//* === Solana
	if (isAddress(address)) {
		try {
			return {
				isValid: true,
				network: DetectedNetwork.Solana,
			};
		} catch {}
	}

	//* === Bitcoin
	if (validateBitcoinAddress(address)) {
		return {
			isValid: true,
			network: DetectedNetwork.Bitcoin,
		};
	}

	//* === Tron
	if (TronWeb.isAddress(address)) {
		return {
			isValid: true,
			network: DetectedNetwork.TRON,
		};
	}

	//* === Cosmos
	if (TronWeb.isAddress(address)) {
		try {
			const { prefix } = bech32.decode(address);
			if (prefix === "cosmos") {
				return {
					isValid: true,
					network: DetectedNetwork.Cosmos,
				};
			}
		} catch {}
	}

	//* === Aptos
	if (/^0x[\dA-Fa-f]{64}$/.test(address)) {
		return {
			isValid: true,
			network: DetectedNetwork.Aptos,
			normalizedAddress: address.toLowerCase(),
		};
	}

	//* === Sui
	if (/^0x[\dA-Fa-f]{64,66}$/.test(address)) {
		return {
			isValid: true,
			network: DetectedNetwork.Sui,
			normalizedAddress: address.toLowerCase(),
		};
	}

	return {
		isValid: false,
		network: DetectedNetwork.Unknown,
	};
}
