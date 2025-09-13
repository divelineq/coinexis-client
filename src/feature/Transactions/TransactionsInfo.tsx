import type { SmartTransactions } from "@api";
import type { PaginationState } from "@tanstack/react-table";
import { Table } from "@ui";
import { DEFAULT_TRANSACTIONS_COLUMNS } from "./defaultColumns";

type Props = {
	data: SmartTransactions | undefined;
	error: Error | null;
	pagination: PaginationState;
	shouldShowSkeleton: boolean;
	onPaginationChange: (pagination: PaginationState) => void;
};

function TransactionsInfo({
	data,
	error,
	pagination,
	shouldShowSkeleton,
	onPaginationChange,
}: Props) {
	if (error) return <div>{error.message}</div>;

	return (
		<div>
			{data?.data.transactions && (
				<Table
					shouldShowSkeleton={shouldShowSkeleton}
					pagination={pagination}
					onPaginationChange={onPaginationChange}
					data={data.data.transactions}
					searchId="asset_name"
					defaultColumns={DEFAULT_TRANSACTIONS_COLUMNS}
					rowCount={data.pagination.total}
				/>
			)}
		</div>
	);
}

export { TransactionsInfo };
