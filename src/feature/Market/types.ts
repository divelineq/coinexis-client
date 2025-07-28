import type { DefaultResponse, TickersValidationType } from "@api";
import type { UseQueryResult } from "@tanstack/react-query";

export type SelectedDataAll = DefaultResponse<TickersValidationType>;

export interface TableSource<T> {
	queryResult: UseQueryResult<T, Error>;
	defaultColumns: any[];
	manualPagination?: boolean;
}
