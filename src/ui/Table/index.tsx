import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { HeaderGroups } from "./HeaderGroups";
import { PaginationActions } from "./PaginationActions";
import { Rows } from "./RowModel";

type Props<TColumns extends Array<unknown>, TData extends Array<unknown>> = {
	defaultColumns: TColumns;
	data: TData;
};

function Table<TColumns extends Array<any>, TData extends Array<any>>({
	defaultColumns,
	data,
}: Props<TColumns, TData>) {
	const table = useReactTable({
		columns: defaultColumns,
		data: data,
		rowCount: data.length,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		autoResetPageIndex: false,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 13,
			},
		},
	});

	return (
		<div className="p-4 m-auto" style={{ width: table.getTotalSize() }}>
			<PaginationActions table={table} />
			<HeaderGroups headers={table.getHeaderGroups()} />
			<Rows rowModel={table.getRowModel()} />
		</div>
	);
}

export { Table };
