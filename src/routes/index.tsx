import { Home } from "@features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
	pendingComponent: () => <div>Loading main page...</div>,
	errorComponent: () => <div>Error main page :(</div>,
});
