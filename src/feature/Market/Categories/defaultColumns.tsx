export const DEFAULT_CATEGORIES_COLUMNS = [
	{
		accessorKey: "#",
		header: () => <p className="text-left cursor-default">#</p>,
		size: 50,
		enableSorting: false,
		cell: (props: any) => {
			const pageIndex = props.table.options.state.pagination.pageIndex;
			const pageSize = props.table.options.state.pagination.pageSize;

			return pageIndex * pageSize + props.row.index + 1;
		},
	},
	{
		accessorKey: "name",
		header: () => <p className="text-left cursor-default">Name</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
	},
	{
		accessorKey: "market_cap",
		header: () => <p className="text-left cursor-default">Market Cap</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
	},
	{
		accessorKey: "market_cap_change_24h",
		header: () => <p className="text-left cursor-default">Market Cap 24H</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
	},
	{
		accessorKey: "market_cap_change_7d",
		header: () => <p className="text-left cursor-default">Market Cap 7D</p>,
		cell: (props: any) =>
			props.getValue().toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
	},
];
