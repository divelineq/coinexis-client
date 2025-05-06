import { createFileRoute } from "@tanstack/react-router";
import { InfoCurrency } from "../components/Currency";
import { ALL_COIN } from "../consts/allCoins";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	pendingComponent: () => <div>Загрузка...</div>,
	errorComponent: () => <div>Ошибка :(</div>,
});

function RouteComponent() {
	return (
		<>
			{ALL_COIN.map((coin) => {
				return <InfoCurrency key={coin} currency={coin} />;
			})}
		</>
	);
}
