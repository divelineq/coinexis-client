import type { SmartTransactions } from "@api";
import type { PaginationState } from "@tanstack/react-table";
import { Table } from "@ui";
import { DEFAULT_TRANSACTIONS_COLUMNS } from "./defaultColumns";

type Props = {
	data: SmartTransactions | undefined;
	error: Error | null;
	pagination: PaginationState;
	onPaginationChange: (pagination: PaginationState) => void;
	isRefetching: boolean;
};

function TransactionsInfo({
	data,
	error,
	pagination,
	isRefetching,
	onPaginationChange,
}: Props) {
	if (error) return <div>{error.message}</div>;

	return (
		<div>
			{data?.data.transactions && (
				<Table
					isRefetching={isRefetching}
					pagination={pagination}
					onPaginationChange={onPaginationChange}
					data={data.data.transactions}
					searchId="asset_name"
					defaultColumns={DEFAULT_TRANSACTIONS_COLUMNS}
					rowCount={data.pagination.total}
					manualPagination
				/>
			)}
		</div>
	);
}

export { TransactionsInfo };
