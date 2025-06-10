export const DEFAULT_ALL_ASSETS_COLUMNS = [
	{
		accessorKey: "logo",
		header: () => <p className="text-center">Logo</p>,
		size: 70,
		enableSorting: false,
		cell: (props: any) => (
			<img src={props.getValue() ?? null} alt="" className="w-8 h-8" />
		),
	},
	{
		accessorKey: "name",
		header: () => <p className="text-left">Name</p>,
		size: 300,
		cell: (props: any) => <p>{props.getValue()}</p>,
		enableSorting: true,
	},
	{
		accessorKey: "price",
		header: () => <p className="text-center">Price</p>,
		size: 200,
		cell: (props: any) => {
			const price24H = props.row.original.price_change_24h.toFixed(2);
			const color =
				price24H > 0
					? "text-green-500"
					: price24H < 0
						? "text-red-500"
						: "text-gray-200";

			return (
				<p className={color}>
					{`${props.row.original.price.toFixed(2)}$  ${price24H > 0 ? "▴" : price24H < 0 ? "▾" : ""}`}
				</p>
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
