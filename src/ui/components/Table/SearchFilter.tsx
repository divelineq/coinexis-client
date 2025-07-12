import type { Table } from "@tanstack/react-table";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "../Input";

type Props = {
	className?: string;
	table: Table<any>;
	searchId: string;
};

function SearchFilter({ className, table, searchId }: Props) {
	return (
		<Input
			value={table.getColumn(searchId)?.getFilterValue() as string}
			onChange={(e) =>
				table.getColumn(searchId)?.setFilterValue(e.target.value)
			}
			className={className}
			placeholder="Search by name"
			startIcon={<AiOutlineSearch size={20} />}
		/>
	);
}

export { SearchFilter };
