import { WalletField } from "@ui";
import { parseAsString, useQueryState } from "nuqs";
import { useTransactions } from "../../queries/useTransactions";
import { TransactionsInfo } from "./TransactionsInfo";
import { usePaginationState } from "./usePaginationState";

function Transactions() {
	const [address, setAddress] = useQueryState("address", parseAsString);
	const [pagination, setPagination] = usePaginationState();

	const { data, isLoading, error, isRefetching } = useTransactions(
		address,
		pagination.pageSize,
		pagination.pageIndex * pagination.pageSize,
	);

	return (
		<div>
			<WalletField onChange={setAddress} isPending={isLoading} />
			{data && (
				<TransactionsInfo
					isRefetching={isRefetching}
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
