import type { PaginationState } from "@tanstack/react-table";
import { Table } from "@ui";
import { useState } from "react";
import { Skeleton } from "./Skeleton";
import { DEFAULT_MANY_COINS_COLUMNS } from "./defaultColumns";
import { useCoins } from "./useCoins";

function BaseCoins() {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 50,
	});
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
