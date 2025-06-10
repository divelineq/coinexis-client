import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { HeaderGroups } from "./HeaderGroups";
import { PaginationActions } from "./PaginationActions";
import { Rows } from "./RowModel";
import { SearchFilter } from "./SearchFilter";

type Props<TColumns extends Array<unknown>, TData extends Array<unknown>> = {
	defaultColumns: TColumns;
	data: TData;
};

interface ColumnFilter {
	id: string;
	value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

function Table<TColumns extends Array<any>, TData extends Array<any>>({
	defaultColumns,
	data,
}: Props<TColumns, TData>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		data: data,
		enableColumnFilters: true,
		rowCount: data.length,
		columns: defaultColumns,
		autoResetPageIndex: false,
		state: {
			columnFilters,
		},
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 13,
			},
		},
	});

	return (
		<div className="p-4 m-auto" style={{ width: table.getTotalSize() }}>
			<div className="flex justify-between w-full py-2">
				<SearchFilter className="w-1/3" table={table} />
				<PaginationActions table={table} />
			</div>
			<HeaderGroups headers={table.getHeaderGroups()} />
			<Rows rowModel={table.getRowModel()} />
		</div>
	);
}

export { Table };
