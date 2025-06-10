import type { Table } from "@tanstack/react-table";
import { TextField } from "../TextField";

type Props = {
	className?: string;
	table: Table<any>;
	searchId: string;
};

function SearchFilter({ className, table, searchId }: Props) {
	return (
		<TextField
			value={table.getColumn(searchId)?.getFilterValue() as string}
			onChange={table.getColumn(searchId)?.setFilterValue}
			className={className}
		/>
	);
}

export { SearchFilter };
