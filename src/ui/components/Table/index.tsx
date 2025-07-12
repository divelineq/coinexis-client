import type { Updater } from "@tanstack/react-query";
import {
	type PaginationState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import cx from "classix";
import { useRef, useState } from "react";
import { HeaderGroups } from "./HeaderGroups";
import { PaginationActions } from "./PaginationActions";
import { PaginationInfo } from "./PaginationInfo";
import { Rows } from "./RowModel";
import { SearchFilter } from "./SearchFilter";

type Props<TColumns extends unknown[], TData extends unknown[]> = {
	/**
	 * Объявление колонок
	 */
	defaultColumns: TColumns;
	/**
	 * Массив данных
	 */
	data: TData;
	/**
	 * По какому полю будет поиск в таблице `accessorKey`
	 */
	searchId: string;
	/**
	 * Общее количество строк в таблице если известно
	 */
	rowCount?: number;
	/**
	 * Boolean значение обозначающее загрузку данных если есть серверная пагинация
	 */
	isRefetching?: boolean;
	/**
	 * Указывается в случае если пагинация делается самостоятельно
	 */
	manualPagination?: boolean;
	/**
	 * Указывает количество страниц, необходимо в случае если на сервере не возвращается pagination данные
	 */
	pageCount?: number;
	/**
	 * Высота строк
	 * @default 80px
	 */
	rowHeight?: number;
	className?: string;
	pagination: PaginationState;
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
	className,
	isRefetching,
	pagination,
	pageCount,
	onPaginationChange,
	rowHeight,
	manualPagination = false,
}: Props<TColumns, TData>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const parentRef = useRef<HTMLDivElement>(null);

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
		pageCount,
		columns: defaultColumns,
		enableColumnFilters: true,
		autoResetPageIndex: false,
		state: {
			columnFilters,
			pagination,
		},
		manualPagination,
		defaultColumn: {
			size: 400,
			minSize: 50,
			maxSize: 700,
		},
	});

	const virtualizer = useVirtualizer({
		count: table.getRowModel().rows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 80,
		overscan: 5,
	});

	return (
		<div className={cx(className, "overflow-auto")} ref={parentRef}>
			<div className="flex justify-between w-full py-2">
				<SearchFilter className="w-1/5" table={table} searchId={searchId} />
				<PaginationActions table={table} isRefetching={isRefetching} />
			</div>
			<HeaderGroups headers={table.getHeaderGroups()} />
			<Rows
				rowModel={table.getRowModel()}
				virtualizer={virtualizer}
				rowHeight={rowHeight}
			/>
			<div className="flex justify-between w-full py-2">
				<PaginationInfo pagination={table.getState().pagination} data={data} />
				<PaginationActions table={table} isRefetching={isRefetching} />
			</div>
		</div>
	);
}

export { Table };
