import { IoWalletOutline } from "react-icons/io5";
import { DetectedNetwork } from "./enums";

export function getStartIcon(network: DetectedNetwork) {
	switch (network) {
		case DetectedNetwork.Ethereum:
			return (
				<img src="/public/assets/ethereum.png" alt="ETH" className="w-5 h-5" />
			);
		case DetectedNetwork.Solana:
			return (
				<img src="/public/assets/solana.png" alt="SOL" className="w-5 h-5" />
			);
		case DetectedNetwork.Bitcoin:
			return (
				<img src="/public/assets/bitcoin.png" alt="BTC" className="w-5 h-5" />
			);
		case DetectedNetwork.Sui:
			return <img src="/public/assets/sui.png" alt="SUI" className="w-5 h-5" />;
		case DetectedNetwork.TRON:
			return (
				<img src="/public/assets/tron.png" alt="TRON" className="w-5 h-5" />
			);
		case DetectedNetwork.Cosmos:
			return (
				<img src="/public/assets/cosmos.png" alt="COS" className="w-5 h-5" />
			);
		case DetectedNetwork.Aptos:
			return (
				<img src="/public/assets/aptos.png" alt="APT" className="w-5 h-5" />
			);

		default:
			return <IoWalletOutline size={20} />;
	}
}
