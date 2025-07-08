import { Table, Tabs } from "@ui";
import { useState } from "react";
import { Skeleton } from "./Skeleton";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { usePaginationState } from "./usePaginationState";
import { useQueryCoins } from "./useQueryCoins";

export enum SelectedTab {
	All = "all",
	Categories = "categories",
}

const TAB_OPTIONS = [
	{ id: SelectedTab.All, label: "All Coins" },
	{ id: SelectedTab.Categories, label: "Categories" },
];

function BaseCoins() {
	const [selectedTab, setSelectedTab] = useState(SelectedTab.All);
	const [pagination, setPagination] = usePaginationState();
	const { data, isLoading, isRefetching } = useQueryCoins(
		pagination.pageSize,
		pagination.pageIndex * pagination.pageSize,
	);

	if (isLoading) return <Skeleton />;

	return (
		data && (
			<div>
				<Tabs
					className="px-4"
					tabs={TAB_OPTIONS}
					value={selectedTab as string}
					onChange={(val) => setSelectedTab(val as SelectedTab)}
				/>
				<Table
					//! костыль
					pageCount={Math.floor(data.lengthCoins / pagination.pageSize) - 8}
					isRefetching={isRefetching}
					manualPagination
					className="w-full py-2 px-5"
					pagination={pagination}
					onPaginationChange={setPagination}
					defaultColumns={DEFAULT_MANY_COINS_COLUMNS}
					data={data.queryCoins}
					searchId="name"
				/>
			</div>
		)
	);
}

export const Coins = Object.assign(BaseCoins, { Skeleton });
