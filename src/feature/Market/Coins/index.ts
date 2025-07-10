import type { SortedCoinsServiceResponse } from "@service";
import type { PaginationState } from "@tanstack/react-table";
import type { TableSource } from "../types";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { useQueryCoins } from "./useQueryCoins";

export function getCoinsTableSource(
	pagination: PaginationState,
): TableSource<SortedCoinsServiceResponse> {
	return {
		queryResult: useQueryCoins(
			pagination.pageSize,
			pagination.pageIndex * pagination.pageSize,
		),
		defaultColumns: DEFAULT_MANY_COINS_COLUMNS,
		manualPagination: true,
	};
}
