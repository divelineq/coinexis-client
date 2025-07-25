import type { CategoriesServiceResponse } from "@service";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

const columnHelper = createColumnHelper<CategoriesServiceResponse["data"]>();

export function useDefaultColumns() {
	return useMemo(
		() => [
			{
				accessorKey: "#",
				header: () => <p className="text-left cursor-default">#</p>,
				size: 50,
				enableSorting: false,
				cell: (props: any) => {
					const pageIndex = props.table.options.state.pagination.pageIndex;
					const pageSize = props.table.options.state.pagination.pageSize;

					if (pageIndex <= 0) {
						return props.row.index + 1;
					}

					return props.row.index + 1 + pageSize;
				},
			},
			columnHelper.accessor("name", {
				header: () => <p className="text-left cursor-default">Name</p>,
				cell: (props: any) =>
					props.getValue().toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}),
			}),
			columnHelper.accessor("market_cap", {
				header: () => <p className="text-left cursor-default">Market Cap</p>,
				cell: (props: any) =>
					props.getValue().toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}),
			}),
			columnHelper.accessor("market_cap_change_24h", {
				header: () => (
					<p className="text-left cursor-default">Market Cap 24H</p>
				),
				cell: (props: any) =>
					props.getValue().toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}),
			}),
			columnHelper.accessor("market_cap_change_7d", {
				header: () => <p className="text-left cursor-default">Market Cap 7D</p>,
				cell: (props: any) =>
					props.getValue().toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}),
			}),
		],
		[],
	);
}
