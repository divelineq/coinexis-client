import { createFileRoute } from "@tanstack/react-router";
import { SearchWalletInfo } from "../components/SearchWalletInfo";

export const Route = createFileRoute("/wallet")({
	component: SearchWalletInfo,
	pendingComponent: () => <div>Loading wallet...</div>,
	errorComponent: () => <div>Error wallet :(</div>,
});
