import { Table } from "@ui";
import { Skeleton } from "./Skeleton";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { useQueryCoins } from "./useCoins";
import { usePaginationState } from "./usePaginationState";

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
				{/* <img src={url?.url} alt="jopa" className="w-45" /> */}

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
