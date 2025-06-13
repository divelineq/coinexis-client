import type { Table } from "@tanstack/react-table";
import { cx } from "classix";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

type Props = {
	table: Table<any>;
};

type SwitchPageButtonProps = {
	symbol: React.ReactNode;
	onChange: () => void;
	className?: string;
	disabled?: boolean;
};

function SwitchPageButton({
	onChange,
	symbol,
	className,
	disabled,
}: SwitchPageButtonProps) {
	return (
		<button
			disabled={disabled}
			className={cx(
				"px-4 border-1 border-gray-500 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed",
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
		<div className="flex py-2">
			<SwitchPageButton
				disabled={table.getState().pagination.pageIndex === 0}
				symbol={<AiFillCaretLeft />}
				onChange={table.previousPage}
				className="rounded-l-md"
			/>
			<p className="px-4 border-y-1 border-gray-500">
				{table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
			</p>
			<SwitchPageButton
				disabled={
					table.getState().pagination.pageIndex === table.getPageCount() - 1
				}
				symbol={<AiFillCaretRight />}
				onChange={table.nextPage}
				className="rounded-r-md"
			/>
		</div>
	);
}
