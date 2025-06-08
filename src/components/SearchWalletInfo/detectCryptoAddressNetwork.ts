import { bech32 } from "bech32";
import { validate as validateBitcoinAddress } from "bitcoin-address-validation";
import bs58 from "bs58";
import { TronWeb } from "tronweb";
import { isAddress as isEthAddress } from "viem";

type DetectedNetwork =
  | "Ethereum"
  | "Solana"
  | "Bitcoin"
  | "TRON"
  | "Cosmos"
  | "Aptos"
  | "Sui"
  | "Unknown";

export interface AddressDetectionResult {
  isValid: boolean;
  network: DetectedNetwork;
  normalizedAddress?: string;
}

export const detectCryptoAddressNetwork = (raw: string): AddressDetectionResult => {
  if (!raw || typeof raw !== "string") {
    return { isValid: false, network: "Unknown" };
  }

  const address = raw.trim();

  //* === Ethereum (EVM)
  if (/^0x[a-fA-F0-9]{40}$/.test(address) && isEthAddress(address)) {
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
    } catch (_) {}
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
    } catch (_) {}
  }

  //* === Cosmos
  if (/^cosmos1[0-9a-z]{38}$/.test(address)) {
    try {
      const { prefix } = bech32.decode(address);
      if (prefix === "cosmos") {
        return {
          isValid: true,
          network: "Cosmos",
        };
      }
    } catch (_) {}
  }

  //* === Aptos
  if (/^0x[a-fA-F0-9]{64}$/.test(address)) {
    return {
      isValid: true,
      network: "Aptos",
      normalizedAddress: address.toLowerCase(),
    };
  }

  //* === Sui
  if (/^0x[a-fA-F0-9]{64,66}$/.test(address)) {
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
};