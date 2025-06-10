import {
	getCoreRowModel,
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

function Table<TColumns extends Array<any>, TData extends Array<any>>({
	defaultColumns,
	data,
}: Props<TColumns, TData>) {
	const [columnFilters, setColumnFilters] = useState([]);

	const table = useReactTable({
		columns: defaultColumns,
		data: data,
		rowCount: data.length,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
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
				<SearchFilter className="w-1/3" />
				<PaginationActions table={table} />
			</div>
			<HeaderGroups headers={table.getHeaderGroups()} />
			<Rows rowModel={table.getRowModel()} />
		</div>
	);
}

export { Table };
