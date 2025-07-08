import { Table, Tabs } from "@ui";
import { Skeleton } from "./Skeleton";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { useQueryCoins } from "./useCoins";
import { usePaginationState } from "./usePaginationState";

const TAB_OPTIONS = [
	{ id: "all", label: "All Coins" },
	{ id: "categories", label: "Categories" },
	{ id: "favorites", label: "Favorites" },
];

function BaseCoins() {
	const [pagination, setPagination] = usePaginationState();
	const { data, isLoading, isRefetching } = useQueryCoins(
		pagination.pageSize,
		pagination.pageIndex * pagination.pageSize,
	);

	if (isLoading) return <Skeleton />;

	return (
		data?.queryCoins && (
			<div>
				<Tabs
					className="px-4"
					tabs={TAB_OPTIONS}
					onChange={(val) => console.log("Selected tab:", val)}
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
