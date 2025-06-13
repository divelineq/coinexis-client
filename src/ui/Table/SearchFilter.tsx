import type { Table } from "@tanstack/react-table";
import { AiOutlineSearch } from "react-icons/ai";
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
			placeholder="Search by name"
			startIcon={<AiOutlineSearch className="w-6 h-6 ml-2" />}
		/>
	);
}

export { SearchFilter };
