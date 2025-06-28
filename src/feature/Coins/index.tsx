import type { PaginationState } from "@tanstack/react-table";
import { Table } from "@ui";
import { useState } from "react";
import { Skeleton } from "./Skeleton";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { useCoins } from "./useCoins";

function BaseCoins() {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 15,
	});
	const { data } = useCoins();

	return (
		<Table
			pagination={pagination}
			onPaginationChange={setPagination}
			defaultColumns={DEFAULT_MANY_COINS_COLUMNS}
			data={data.coins}
			searchId="name"
		/>
	);
}

export const Coins = Object.assign(BaseCoins, { Skeleton });
