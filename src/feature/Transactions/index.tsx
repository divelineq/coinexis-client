import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { TransactionsInfo } from "./TransactionsInfo";
import { usePaginationState } from "./usePaginationState";
import { useTransactions } from "./useTransactions";

function Transactions() {
	const [address, setAddress] = useQueryState("address", parseAsString);
	const [pagination, setPagination] = usePaginationState();

	const { data, isLoading, error, isFetched, isFetching } = useTransactions(
		address,
		pagination.pageSize,
		pagination.pageIndex * pagination.pageSize,
	);

	return (
		<div className="p-4">
			<WalletField onChange={setAddress} isPending={isLoading} />
			{data && (
				<TransactionsInfo
					shouldShowSkeleton={!isFetched && isFetching}
					data={data}
					error={error}
					pagination={pagination}
					onPaginationChange={setPagination}
				/>
			)}
		</div>
	);
}

export { Transactions };
