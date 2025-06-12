import { createFileRoute } from "@tanstack/react-router";
import { ManyCoinsSkeleton, ManyCoinsTable } from "../components";

export const Route = createFileRoute("/coins")({
	component: ManyCoinsTable,
	pendingComponent: () => <ManyCoinsSkeleton />,
	errorComponent: () => <div>Error assets table :(</div>,
});
