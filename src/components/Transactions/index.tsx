import type { PaginationState } from "@tanstack/react-table";
import { WalletField } from "@ui";
import { useState } from "react";
import { useTransactions } from "../../queries/useTransactions";
import { TransactionsInfo } from "./TransactionsInfo";

function Transactions() {
	const [adress, setAdress] = useState<string>("");
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 13,
	});

	const { data, isLoading, error, isRefetching } = useTransactions(
		adress,
		pagination.pageSize,
		pagination.pageIndex * pagination.pageSize,
	);

	return (
		<div>
			<WalletField onChange={setAdress} isPending={isLoading} />
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
