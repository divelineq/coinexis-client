import { createFileRoute } from "@tanstack/react-router";
import { Transactions } from "../components/Transactions";

export const Route = createFileRoute("/transactions")({
	component: Transactions,
	pendingComponent: () => <div>Loading transactions...</div>,
	errorComponent: () => <div>Error transactions :(</div>,
});
