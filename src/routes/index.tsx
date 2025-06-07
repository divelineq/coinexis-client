import { createFileRoute } from "@tanstack/react-router";
import { InfoCurrency } from "../components/Currency";
import { MainSkeleton } from "../components/Skeletons/MainSkeleton";
import { ALL_COIN } from "../consts/allCoins";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	pendingComponent: () => <MainSkeleton />,
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
