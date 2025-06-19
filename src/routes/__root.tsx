import { Header } from "@feature";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: Header,
	pendingComponent: () => <div>Loading header</div>,
	errorComponent: () => <div>Error header :(</div>,
});
