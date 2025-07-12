import type { SortedCoinsServiceResponse } from "@service";
import type { PaginationState } from "@tanstack/react-table";
import type { TableSource } from "../types";
import { useDefaultColumns } from "./useDefaultColumns";
import { useQueryCoins } from "./useQueryCoins";

export function getCoinsTableSource(
	pagination: PaginationState,
): TableSource<SortedCoinsServiceResponse> {
	return {
		queryResult: useQueryCoins(
			pagination.pageSize,
			pagination.pageIndex * pagination.pageSize,
		),
		defaultColumns: useDefaultColumns(),
		manualPagination: true,
	};
}
