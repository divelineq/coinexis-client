import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/charts/")({
	component: RouteComponent,
});

function RouteComponent() {
	// const { data } = useGetAllAssets();

	return (
		<>
			{/* {data.map((coin) => {
				return (
					<CurrencyChart key={coin.name} currency={coin.name} className="p-4" />
				);
			})} */}
			Charts
		</>
	);
}
