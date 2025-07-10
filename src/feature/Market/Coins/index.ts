import type { QueryCoinsService } from "@service";
import type { PaginationState } from "@tanstack/react-table";
import type { SelectedData } from "../types";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { useQueryCoins } from "./useQueryCoins";

export function getCoinsSelectedData(
	pagination: PaginationState,
): SelectedData<QueryCoinsService> {
	return {
		query: useQueryCoins(
			pagination.pageSize,
			pagination.pageIndex * pagination.pageSize,
		),
		defaultColumns: DEFAULT_MANY_COINS_COLUMNS,
		manualPagination: true,
	};
}
