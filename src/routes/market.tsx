import { Market } from "@feature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/market")({
	component: () => <Market />,
	pendingComponent: () => <Market.Skeleton />,
	errorComponent: () => <div>Error assets table :(</div>,
});
