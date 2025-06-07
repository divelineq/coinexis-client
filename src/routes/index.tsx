import { createFileRoute } from "@tanstack/react-router";
import { useGetAllAssets } from "../api";
import { MainSkeleton } from "../components/Skeletons/MainSkeleton";
import { Table } from "../components/Table";

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
			<img src={props?.getValue() ?? null} alt="" className="w-6 h-6" />
		),
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: (props: any) => <p>{props?.getValue() ?? null}</p>,
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: (props: any) => <p>{props?.getValue()?.toFixed(2) ?? null}$</p>,
	},
	{
		accessorKey: "price_change_1h",
		header: "1H",
		cell: (props: any) => <p>{props?.getValue()?.toFixed(3) ?? null}%</p>,
	},
	{
		accessorKey: "price_change_24h",
		header: "24H",
		cell: (props: any) => <p>{props?.getValue()?.toFixed(3) ?? null}%</p>,
	},
	{
		accessorKey: "price_change_7d",
		header: "7D",
		cell: (props: any) => <p>{props?.getValue()?.toFixed(3) ?? null}%</p>,
	},
];

function RouteComponent() {
	const { data } = useGetAllAssets();

	return <Table defaultColumns={DEFAULT_COLUMNS} data={data} />;
}
