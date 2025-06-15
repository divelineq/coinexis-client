import type { Table } from "@tanstack/react-table";
import { cx } from "classix";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { PulseLoader } from "react-spinners";

type Props = {
	table: Table<any>;
	isRefetching?: boolean;
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

export function PaginationActions({ table, isRefetching }: Props) {
	return (
		<div className="flex py-2">
			{isRefetching && (
				<PulseLoader
					size={6}
					color="rgb(238, 238, 238)"
					className="pr-2 items-center"
				/>
			)}
			<SwitchPageButton
				disabled={!table.getCanPreviousPage()}
				symbol={<AiFillCaretLeft />}
				onChange={() => table.previousPage()}
				className="rounded-l-md"
			/>
			<p className="px-4 border-y-1 border-gray-500">
				{table.getState().pagination.pageIndex + 1} of{" "}
				{table.getPageCount().toLocaleString()}
			</p>
			<SwitchPageButton
				disabled={!table.getCanNextPage()}
				symbol={<AiFillCaretRight />}
				onChange={() => table.nextPage()}
				className="rounded-r-md"
			/>
		</div>
	);
}
