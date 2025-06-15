import type { Updater } from "@tanstack/react-query";
import {
	type PaginationState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { HeaderGroups } from "./HeaderGroups";
import { PaginationActions } from "./PaginationActions";
import { Rows } from "./RowModel";
import { SearchFilter } from "./SearchFilter";

type Props<TColumns extends unknown[], TData extends unknown[]> = {
	/**
	 * Обьявление колонок
	 */
	defaultColumns: TColumns;
	/**
	 * Масив данных
	 */
	data: TData;
	/**
	 * По какому полю будет поиск в таблице `accessorKey`
	 */
	searchId: string;
	/**
	 * Общее колличество строк в таблице если известно
	 */
	rowCount?: number;
	/**
	 * Булеан значение обозначающее загрузку данных если есть серверная пагинация
	 */
	isRefetching?: boolean;
	manualPagination?: boolean;
	pagination?: PaginationState;
	onPaginationChange?: (old: PaginationState) => void;
};

interface ColumnFilter {
	id: string;
	value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

function Table<TColumns extends any[], TData extends any[]>({
	defaultColumns,
	data,
	searchId,
	rowCount,
	isRefetching,
	pagination,
	onPaginationChange,
	manualPagination = false,
}: Props<TColumns, TData>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: onPaginationChange as (
			updater: Updater<PaginationState, PaginationState>,
		) => void,
		data,
		rowCount,
		columns: defaultColumns,
		enableColumnFilters: true,
		autoResetPageIndex: false,
		state: {
			columnFilters,
			pagination,
		},
		manualPagination,
		defaultColumn: {
			size: 200,
			minSize: 50,
			maxSize: 700,
		},
	});

	return (
		<div className="p-2 m-auto" style={{ width: table.getTotalSize() }}>
			<div className="flex justify-between w-full py-2">
				<SearchFilter className="w-1/5" table={table} searchId={searchId} />
				<PaginationActions table={table} isRefetching={isRefetching} />
			</div>
			<HeaderGroups headers={table.getHeaderGroups()} />
			<Rows rowModel={table.getRowModel()} />
		</div>
	);
}

export { Table };
