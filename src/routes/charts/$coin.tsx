import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/charts/$coin")({
	component: RouteComponent,
	loader: async ({ params }) => ({ coin: params.coin }),
	pendingComponent: () => <div>Загрузка...</div>,
	errorComponent: () => <div>Ошибка :(</div>,
});

function RouteComponent() {
	// const { coin } = Route.useLoaderData();

	return (
		// <CurrencyChart currency={coin} className="p-4" />;
		<p>coin chart</p>
	);
}
