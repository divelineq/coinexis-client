import { Table } from "@ui";
import { Skeleton } from "./Skeleton";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { useCoins } from "./useCoins";
import { usePaginationState } from "./usePaginationState";

function BaseCoins() {
	const [pagination, setPagination] = usePaginationState();

	const { data } = useCoins();

	return (
		<Table
			className="w-full py-2 px-5"
			pagination={pagination}
			onPaginationChange={setPagination}
			defaultColumns={DEFAULT_MANY_COINS_COLUMNS}
			data={data.coins}
			searchId="name"
		/>
	);
}

export const Coins = Object.assign(BaseCoins, { Skeleton });
