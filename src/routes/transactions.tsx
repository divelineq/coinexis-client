import { Transactions } from "@features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transactions")({
	component: Transactions,
	pendingComponent: () => <div>Loading transactions...</div>,
	errorComponent: () => <div>Error transactions :(</div>,
});
