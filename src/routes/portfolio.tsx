import { createFileRoute } from "@tanstack/react-router";
import { SearchWalletInfo } from "../components/PortfolioInfo";

export const Route = createFileRoute("/portfolio")({
	component: SearchWalletInfo,
	pendingComponent: () => <div>Loading wallet...</div>,
	errorComponent: () => <div>Error wallet :(</div>,
});
