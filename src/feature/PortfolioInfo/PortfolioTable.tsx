import type { PortfolioType } from "@api";
import { Table } from "@ui";
import { DEFAULT_PORTFOLIO_COLUMNS } from "./defaultColumns";
import { usePaginationState } from "./usePaginationState";

type Props = {
	data: PortfolioType | undefined;
	shouldShowSkeleton: boolean;
};

function PortfolioTable({ data, shouldShowSkeleton }: Props) {
	const [pagination, setPagination] = usePaginationState();

	return (
		<Table
			shouldShowSkeleton={shouldShowSkeleton}
			pagination={pagination}
			onPaginationChange={setPagination}
			searchId="asset_name"
			defaultColumns={DEFAULT_PORTFOLIO_COLUMNS}
			data={data?.assets ?? []}
		/>
	);
}

export { PortfolioTable };
