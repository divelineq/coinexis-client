import { createFileRoute } from "@tanstack/react-router";
import { useCurrencyCoin } from "../api";
import { MainSkeleton } from "../components/Skeletons/MainSkeleton";
import { Table } from "../components/Table";
import { ALL_COIN } from "../consts/allCoins";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	pendingComponent: () => <MainSkeleton />,
	errorComponent: () => <div>Ошибка :(</div>,
});

const DEFAULT_COLUMNS = [
	{
		accessorKey: "logo",
		header: "Logo",
		size: 50,
		cell: (props: any) => (
			<img src={props.getValue()} alt="" className="w-6 h-6" />
		),
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: (props: any) => <p>{props.getValue()}</p>,
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: (props: any) => <p>{props.getValue().toFixed(2)}$</p>,
	},
	{
		accessorKey: "price_change_1h",
		header: "1H",
		cell: (props: any) => <p>{props.getValue().toFixed(3)}%</p>,
	},
	{
		accessorKey: "price_change_24h",
		header: "24H",
		cell: (props: any) => <p>{props.getValue().toFixed(3)}%</p>,
	},
	{
		accessorKey: "price_change_7d",
		header: "7D",
		cell: (props: any) => <p>{props.getValue().toFixed(3)}%</p>,
	},
];

function RouteComponent() {
	const { data } = useCurrencyCoin(ALL_COIN);

	return <Table defaultColumns={DEFAULT_COLUMNS} data={data} />;
}
