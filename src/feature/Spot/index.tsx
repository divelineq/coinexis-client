import { useNavigate } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { ErrorScreen, Table } from "@ui";
import { Skeleton } from "./Skeleton";
import { DEFAULT_COLUMNS } from "./defaultColumns";
import { usePaginationState } from "./usePaginationState";
import { useQueryCoins } from "./useQueryCoins";

function BaseMarket() {
	const navigate = useNavigate();
	const [pagination, setPagination] = usePaginationState(50);
	const { data, isLoading, error, isFetched, isFetching } = useQueryCoins({
		category: "spot",
	});

	if (isLoading) return <Skeleton />;
	if (error) return <ErrorScreen error={error} />;

	const handleClick = (row: Row<any>) => {
		navigate({
			to: "/spot/$coin",
			params: { coin: row.original.symbol },
		});
	};

	return (
		<Table
			onRowClick={handleClick}
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
