import { ErrorScreen, Table } from "@ui";
import { Skeleton } from "./Skeleton";
import { DEFAULT_COLUMNS } from "./defaultColumns";
import { usePaginationState } from "./usePaginationState";
import { useQueryCoins } from "./useQueryCoins";

function BaseMarket() {
	const [pagination, setPagination] = usePaginationState(50);
	const { data, isLoading, error, isFetched, isFetching } = useQueryCoins({
		category: "spot",
	});

	if (isLoading) return <Skeleton />;
	if (error) return <ErrorScreen error={error} />;

	return (
		<Table
			pageCount={Math.floor(
				data?.result.list.length ?? 0 / pagination.pageSize,
			)}
			manualPagination={false}
			shouldShowSkeleton={!isFetched && isFetching}
			className="w-full py-2 px-5"
			pagination={pagination}
			onPaginationChange={setPagination}
			defaultColumns={DEFAULT_COLUMNS}
			data={data?.result.list ?? []}
			searchId="symbol"
		/>
	);
}

export const Market = Object.assign(BaseMarket, { Skeleton });
