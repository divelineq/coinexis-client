import { PortfolioInfo } from "@feature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio")({
	component: PortfolioInfo,
	pendingComponent: () => <div>Loading wallet...</div>,
	errorComponent: () => <div>Error wallet :(</div>,
});
