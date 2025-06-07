import type { Table } from "@tanstack/react-table";

type Props = {
	table: Table<any>;
};

export function PaginationActions({ table }: Props) {
	return (
		<div className="p-2">
			<p>
				Page: {table.getState().pagination.pageIndex + 1} of{" "}
				{table.getPageCount()}
			</p>
			<div>
				<button
					className="px-4 border-1 rounded-l-lg hover:bg-gray-500"
					onClick={table.previousPage}
				>
					{"<"}
				</button>
				<button
					className="px-4 border-1 rounded-r-lg hover:bg-gray-500"
					onClick={table.nextPage}
				>
					{">"}
				</button>
			</div>
		</div>
	);
}
