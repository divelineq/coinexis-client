import type { UseQueryResult } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { ErrorScreen, Table, Tabs } from "@ui";
import type { SelectedDataAll } from "src/feature/Market/types";
import { Skeleton } from "./Skeleton";

type Props<TValue extends string> = {
	pagination: PaginationState;
	onPaginationChange: (pagination: PaginationState) => void;
	value: TValue;
	onChange: (val: TValue) => void;
	tabOptions: { id: string; label: string }[];
	manualPagination?: boolean;
	queryResult: UseQueryResult<SelectedDataAll, Error>;
	defaultColumns: any[];
};

function Market<TValue extends string>({
	onPaginationChange,
	onChange,
	queryResult,
	tabOptions,
	pagination,
	value,
	defaultColumns,
	manualPagination = false,
}: Props<TValue>) {
	if (queryResult.isLoading) return <Skeleton />;
	if (queryResult.isError) return <ErrorScreen error={queryResult.error} />;

	const handleTabChange = (val: string) => {
		onChange(val as TValue);
		onPaginationChange({ ...pagination, pageIndex: 0 });
	};

	return (
		queryResult.data && (
			<div>
				<Tabs
					className="px-4 w-full"
					tabs={tabOptions}
					value={value}
					onChange={handleTabChange}
				/>
				<Table
					pageCount={Math.floor(queryResult.data?.total / pagination.pageSize)}
					isRefetching={queryResult.isRefetching}
					manualPagination={manualPagination}
					className="w-full py-2 px-5"
					pagination={pagination}
					onPaginationChange={onPaginationChange}
					defaultColumns={defaultColumns}
					data={queryResult.data.data}
					searchId="name"
				/>
			</div>
		)
	);
}

export { Market };
