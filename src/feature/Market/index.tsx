import { TickerCategory } from "@api";
import { useNavigate } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { ErrorScreen, Table } from "@ui";
import { Route } from "../../routes/market/$category";
import { Skeleton } from "./Skeleton";
import { categoriesMap } from "./categoriesMap";
import { usePaginationState } from "./usePaginationState";
import { useQueryCoins } from "./useQueryCoins";

function BaseMarket() {
	const navigate = useNavigate();
	const { category } = Route.useLoaderData();

	const [pagination, setPagination] = usePaginationState(50);
	const categoryData = categoriesMap.get(category || TickerCategory.Spot);

	const { data, isLoading, error, isFetched, isFetching } = useQueryCoins(
		categoryData?.params ?? { category: TickerCategory.Spot },
	);

	if (isLoading) return <Skeleton />;
	if (error) return <ErrorScreen error={error} />;

	const handleClick = (row: Row<any>) => {
		navigate({
			to: `/market/${category}/$coin`,
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
			defaultColumns={categoryData?.columns ?? []}
			data={data?.result.list ?? []}
			searchId="symbol"
		/>
	);
}

export const Market = Object.assign(BaseMarket, { Skeleton });
