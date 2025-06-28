import { Coins } from "@feature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coins")({
	component: () => <Coins />,
	pendingComponent: () => <Coins.Skeleton />,
	errorComponent: () => <div>Error assets table :(</div>,
});
