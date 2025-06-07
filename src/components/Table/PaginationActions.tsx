import type { Table } from "@tanstack/react-table";
import { cx } from "classix";

type Props = {
	table: Table<any>;
};

type SwitchPageButtonProps = {
	symbol: string;
	onChange: () => void;
	className?: string;
};

function SwitchPageButton({
	onChange,
	symbol,
	className,
}: SwitchPageButtonProps) {
	return (
		<button
			className={cx(
				"px-4 border-1 border-gray-500 hover:bg-gray-500",
				className,
			)}
			onClick={onChange}
		>
			{symbol}
		</button>
	);
}

export function PaginationActions({ table }: Props) {
	return (
		<div className="flex m-auto py-2">
			<SwitchPageButton
				symbol="<"
				onChange={table.previousPage}
				className="rounded-l-md"
			/>
			<p className="px-4 border-y-1 border-gray-500">
				{table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
			</p>
			<SwitchPageButton
				symbol=">"
				onChange={table.nextPage}
				className="rounded-r-md"
			/>
		</div>
	);
}
