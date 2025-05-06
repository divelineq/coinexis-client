import { createFileRoute } from "@tanstack/react-router";
import { CurrencyChart } from "../../components/CurrencyChart";

export const Route = createFileRoute("/charts/$coin")({
	component: RouteComponent,
	loader: async ({ params }) => ({ coin: params.coin }),
	pendingComponent: () => <div>Загрузка...</div>,
	errorComponent: () => <div>Ошибка :(</div>,
});

function RouteComponent() {
	const { coin } = Route.useLoaderData();

	return <CurrencyChart currency={coin} className="p-4" />;
}
