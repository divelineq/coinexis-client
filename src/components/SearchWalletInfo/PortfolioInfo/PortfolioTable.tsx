import type { PortfolioType } from "@api";
import { Table } from "@ui";
import { DEFAULT_PORTFOLIO_COLUMNS } from "../../../consts";

type Props = {
	data: PortfolioType | undefined;
};

function PortfolioTable({ data }: Props) {
	return (
		<Table
			defaultColumns={DEFAULT_PORTFOLIO_COLUMNS}
			data={data?.assets ?? []}
		/>
	);
}

export { PortfolioTable };
