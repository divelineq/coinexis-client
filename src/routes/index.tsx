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
		size: 60,
		cell: (props: any) => (
			<img src={props?.getValue() ?? null} alt="" className="w-8 h-8" />
		),
	},
	{
		accessorKey: "name",
		header: "Name",
		size: 300,
		cell: (props: any) => <p>{props.getValue()}</p>,
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: (props: any) => {
			const price24H = props.row.original.price_change_24h.toFixed(2);
			const color =
				price24H > 0
					? "text-green-500"
					: price24H < 0
						? "text-red-500"
						: "text-gray-200";

			return (
				<span>
					<p className={color}>
						{`${props.row.original.price.toFixed(2)}$  ${price24H > 0 ? "▴" : price24H < 0 ? "▾" : ""}`}
					</p>
				</span>
			);
		},
	},
	{
		accessorKey: "price_change_1h",
		header: "1H",
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
	},
	{
		accessorKey: "price_change_24h",
		header: "24H",
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
	},
	{
		accessorKey: "price_change_7d",
		header: "7D",
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
	},
	{
		accessorKey: "price_change_1m",
		header: "1M",
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
	},
	{
		accessorKey: "price_change_1y",
		header: "1Y",
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
	},
];

function RouteComponent() {
	const { data } = useGetAllAssets();

	console.log(data);

	return <Table defaultColumns={DEFAULT_COLUMNS} data={data} />;
}
