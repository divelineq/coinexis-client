import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => <div>Начальная страница</div>,
	pendingComponent: () => <div>Loading main page...</div>,
	errorComponent: () => <div>Error main page :(</div>,
});
