import { Header } from "@features";
import { createRootRoute } from "@tanstack/react-router";
import { ErrorScreen } from "@ui";

export const Route = createRootRoute({
	component: Header,
	pendingComponent: () => <div>Loading header</div>,
	errorComponent: () => <ErrorScreen message="Header error" />,
});
