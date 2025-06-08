import { createRootRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createRootRoute({
	component: Header,
	pendingComponent: () => <div>Loading header</div>,
	errorComponent: () => <div>Error header :(</div>,
});
