import type { CategoriesServiceType, QueryCoinsService } from "@service";
import type { UseQueryResult } from "@tanstack/react-query";

export type SelectedDataAll = CategoriesServiceType | QueryCoinsService;

export interface SelectedData<TQuery> {
	query: UseQueryResult<TQuery, Error>;
	defaultColumns: any[];
	manualPagination?: boolean;
}
