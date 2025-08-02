import { Market } from "@feature";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorScreen } from "@ui";

export const Route = createFileRoute("/market/")({
	component: () => <Market />,
	pendingComponent: () => <Market.Skeleton />,
	errorComponent: (e) => <ErrorScreen error={e.error} />,
});
