import type { SortedCoinsServiceResponse } from "@service";
import type { PaginationState } from "@tanstack/react-table";
import type { TableSource } from "../types";
import { useDefaultColumns } from "./useDefaultColumns";
import { useQueryCoinsWithHistory } from "./useQueryCoins";

export function getCoinsTableSource(
	pagination: PaginationState,
): TableSource<SortedCoinsServiceResponse> {
	return {
		queryResult: useQueryCoinsWithHistory(
			pagination.pageSize,
			pagination.pageIndex * pagination.pageSize,
			"1h",
		),
		defaultColumns: useDefaultColumns(),
		manualPagination: true,
	};
}
