import cx from "classix";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export const DEFAULT_MANY_COINS_COLUMNS = [
	{
		accessorKey: "logo",
		header: () => <p className="text-center">Logo</p>,
		enableResizing: false,
		enableSorting: false,
		size: 60,
		cell: (props: any) => (
			<img src={props.getValue() ?? null} alt="" className="w-6 h-6" />
		),
	},
	{
		accessorKey: "name",
		header: () => <p className="text-left">Name</p>,
		cell: (props: any) => <p>{props.getValue()}</p>,
		enableSorting: true,
	},
	{
		accessorKey: "price",
		header: () => <p className="text-center">Price</p>,
		cell: (props: any) => {
			const price24H = props.row.original.price_change_24h.toFixed(2);
			const color =
				price24H > 0
					? "text-green-500"
					: price24H < 0
						? "text-red-500"
						: "text-gray-200";

			return (
				<div className={cx("flex items-center gap-1", color)}>
					<span>{`${props.row.original.price.toFixed(10)}$`}</span>
					{price24H > 0 ? (
						<AiFillCaretUp className="w-4 h-4" />
					) : price24H < 0 ? (
						<AiFillCaretDown className="w-4 h-4" />
					) : null}
				</div>
			);
		},
		enableSorting: true,
	},
	{
		accessorKey: "price_change_1h",
		header: () => <p className="text-center">1H</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
		enableSorting: true,
	},
	{
		accessorKey: "price_change_24h",
		header: () => <p className="text-center">24H</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
		enableSorting: true,
	},
	{
		accessorKey: "price_change_7d",
		header: () => <p className="text-center">7D</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
		enableSorting: true,
	},
	{
		accessorKey: "price_change_1m",
		header: () => <p className="text-center">1M</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
		enableSorting: true,
	},
	{
		accessorKey: "price_change_1y",
		header: () => <p className="text-center">1Y</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
		enableSorting: true,
	},
];
