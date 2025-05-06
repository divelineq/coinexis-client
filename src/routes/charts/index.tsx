import { createFileRoute } from "@tanstack/react-router";
import { CurrencyChart } from "../../components/CurrencyChart";
import { ALL_COIN } from "../../consts/allCoins";

export const Route = createFileRoute("/charts/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			{ALL_COIN.map((coin) => {
				return <CurrencyChart key={coin} currency={coin} className="p-4" />;
			})}
		</>
	);
}
