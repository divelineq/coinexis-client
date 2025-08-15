import { Market } from "@feature";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorScreen } from "@ui";

export const Route = createFileRoute("/spot/")({
	component: () => <Market />,
	pendingComponent: () => <Market.Skeleton />,
	errorComponent: (e) => <ErrorScreen error={e.error} />,
});
