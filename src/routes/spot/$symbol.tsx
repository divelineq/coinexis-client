import { Trade } from "@feature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/spot/$symbol")({
	loader: ({ params }) => {
		return { symbol: params.symbol };
	},
	component: (param) => <Trade {...param} />,
});
