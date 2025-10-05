import { Table, WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { DEFAULT_TRANSACTIONS_COLUMNS } from "./defaultColumns";
import { usePaginationState } from "./usePaginationState";
import { useTransactions } from "./useTransactions";

function Transactions() {
	const [wallet, setWallet] = useQueryState("wallet", parseAsString);
	const [pagination, setPagination] = usePaginationState();

	const { data, isLoading, error, isFetched, isFetching } = useTransactions(
		wallet,
		pagination.pageSize,
		pagination.pageIndex * pagination.pageSize,
	);

	if (error)
		return (
			<div>
				Кажется произошла непредвиденная ошибка:( Попробуйте перезагрузить
				страницу {error.message}
			</div>
		);

	if (data?.data.transactions.length === 0) {
		return (
			<div className="w-full flex justify-center p-4">
				Нет данных для отображения
			</div>
		);
	}

	return (
		<div className="p-4">
			<WalletField onChange={setWallet} isPending={isLoading} />
			{data && (
				<Table
					shouldShowSkeleton={!isFetched && isFetching}
					pagination={pagination}
					onPaginationChange={setPagination}
					data={data.data.transactions}
					searchId="asset_name"
					defaultColumns={DEFAULT_TRANSACTIONS_COLUMNS}
					rowCount={data.pagination.total}
				/>
			)}
		</div>
	);
}

export { Transactions };
