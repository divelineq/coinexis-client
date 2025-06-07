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

export function Table<TColumns extends Array<any>, TData extends Array<any>>({
	defaultColumns,
	data,
}: Props<TColumns, TData>) {
	const table = useReactTable({
		columns: defaultColumns,
		data: data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		autoResetPageIndex: false,
	});

	return (
		<div
			style={{ width: table.getTotalSize() * 2 }}
			className="gap-2 p-4 w-full m-auto"
		>
			<HeaderGroups headers={table.getHeaderGroups()} />
			<Rows rowModel={table.getRowModel()} />
			<PaginationActions table={table} />
		</div>
	);
}
