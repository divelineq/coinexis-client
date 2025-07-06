import cx from "classix";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

function buildPercentageNumber(value: number) {
	const color =
		value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-200";

	return (
		<div className={cx("flex items-center", color)}>
			{value > 0 ? (
				<AiFillCaretUp className="w-4 h-4" />
			) : value < 0 ? (
				<AiFillCaretDown className="w-4 h-4" />
			) : null}
			<span>{value}%</span>
		</div>
	);
}

export const DEFAULT_MANY_COINS_COLUMNS = [
	{
		accessorKey: "#",
		header: () => <p className="text-left">#</p>,
		size: 90,
		cell: (props: any) => props.row.index + 1,
	},
	{
		accessorKey: "name",
		header: () => <p className="text-left">Name</p>,
		cell: (props: any) => {
			return (
				<div className="flex items-center gap-2">
					<img
						src={props.row.original.logo ?? "logo.png"}
						alt=""
						className="w-7 h-7 rounded-sm"
					/>
					<p className="text-md">{props.getValue()}</p>
					<p className="text-md text-gray-400">{props.row.original.symbol}</p>
				</div>
			);
		},
		enableSorting: true,
	},
	{
		accessorKey: "price",
		header: () => <p className="text-center">Price</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
		enableSorting: true,
	},
	{
		accessorKey: "price_change_1h",
		header: () => <p className="text-center">1h %</p>,
		cell: (props: any) => buildPercentageNumber(props.getValue().toFixed(2)),
		enableSorting: true,
	},
	{
		accessorKey: "price_change_24h",
		header: () => <p className="text-center">24h %</p>,
		cell: (props: any) => buildPercentageNumber(props.getValue().toFixed(2)),
		enableSorting: true,
	},
	{
		accessorKey: "price_change_7d",
		header: () => <p className="text-center">7d %</p>,
		cell: (props: any) => buildPercentageNumber(props.getValue().toFixed(2)),
		enableSorting: true,
	},
	{
		accessorKey: "market_cap",
		header: () => <p className="text-center">Market Cap</p>,
		cell: (props: any) => (
			<p>
				{props.getValue().toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				})}
			</p>
		),
		enableSorting: true,
	},
	{
		accessorKey: "volume",
		header: () => <p className="text-center">Volume</p>,
		cell: (props: any) => (
			<p>
				{props.getValue().toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				})}
			</p>
		),
		enableSorting: true,
	},
	{
		accessorKey: "volume",
		header: () => <p className="text-center">Volume</p>,
		cell: (props: any) => <p>тут будет sparkline</p>,
		enableSorting: false,
	},
];
