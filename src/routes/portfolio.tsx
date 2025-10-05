import { Portfolio } from "@features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio")({
	component: Portfolio,
	pendingComponent: () => <div>Loading wallet...</div>,
	errorComponent: () => <div>Error wallet :(</div>,
});
