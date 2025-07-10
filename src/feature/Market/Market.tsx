import type { UseQueryResult } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Table, Tabs } from "@ui";
import type { SelectedDataAll } from "src/feature/Market/types";
import { Skeleton } from "./Skeleton";
import type { Tab } from "./enums";

type Props = {
	pagination: PaginationState;
	onPaginationChange: (pagination: PaginationState) => void;
	selectedTab: string;
	onSelectedTabChange: (val: Tab) => void;
	tabOptions: { id: string; label: string }[];
	manualPagination?: boolean;
	query: UseQueryResult<SelectedDataAll, Error>;
	defaultColumns: any[];
};

function Market({
	onPaginationChange,
	onSelectedTabChange,
	query,
	tabOptions,
	pagination,
	selectedTab,
	defaultColumns,
	manualPagination = false,
}: Props) {
	if (query.isLoading) return <Skeleton />;

	if (!query?.data || query.isError)
		return (
			<div>Произошла какая то ошибка, попробуйте перезагрузить страницу</div>
		);

	const handleTabChange = (val: string) => {
		onSelectedTabChange(val as Tab);
		onPaginationChange({ ...pagination, pageIndex: 0 });
	};

	return (
		query.data && (
			<div>
				<Tabs
					className="px-4"
					tabs={tabOptions}
					value={selectedTab}
					onChange={handleTabChange}
				/>
				<Table
					pageCount={Math.floor(query.data.lengthData / pagination.pageSize)}
					isRefetching={query.isRefetching}
					manualPagination={manualPagination}
					className="w-full py-2 px-5"
					pagination={pagination}
					onPaginationChange={onPaginationChange}
					defaultColumns={defaultColumns}
					data={query.data.data}
					searchId="name"
				/>
			</div>
		)
	);
}

export { Market };
