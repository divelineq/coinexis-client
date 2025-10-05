import { Trade } from "@features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/market/$category/$symbol")({
	loader: ({ params }) => {
		return { symbol: params.symbol };
	},
	component: (param) => <Trade {...param} />,
});
