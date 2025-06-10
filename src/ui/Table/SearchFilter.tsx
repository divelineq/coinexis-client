import type { Table } from "@tanstack/react-table";
import { TextField } from "../TextField";

type Props = {
	className?: string;
	table: Table<any>;
};

function SearchFilter({ className, table }: Props) {
	return (
		<TextField
			value={table.getColumn("asset_name")?.getFilterValue() as string}
			onChange={table.getColumn("asset_name")?.setFilterValue}
			className={className}
		/>
	);
}

export { SearchFilter };
