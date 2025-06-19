import { ManyCoinsSkeleton, ManyCoinsTable } from "@feature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coins")({
	component: ManyCoinsTable,
	pendingComponent: () => <ManyCoinsSkeleton />,
	errorComponent: () => <div>Error assets table :(</div>,
});
