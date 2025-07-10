import type {
	CategoriesServiceResponse,
	SortedCoinsServiceResponse,
} from "@service";
import type { UseQueryResult } from "@tanstack/react-query";

export type SelectedDataAll =
	| CategoriesServiceResponse
	| SortedCoinsServiceResponse;

export interface TableSource<T> {
	queryResult: UseQueryResult<T, Error>;
	defaultColumns: any[];
	manualPagination?: boolean;
}
