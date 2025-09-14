import { Market } from "@feature";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorScreen } from "@ui";

export const Route = createFileRoute("/market/$category/")({
	loader: ({ params }) => {
		return { category: params.category };
	},
	component: (param) => <Market {...param} />,
	pendingComponent: () => <Market.Skeleton />,
	errorComponent: (e) => <ErrorScreen error={e.error} />,
});
