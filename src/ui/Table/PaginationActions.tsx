import type { Table } from "@tanstack/react-table";
import { cx } from "classix";
import {
	AiFillBackward,
	AiFillCaretLeft,
	AiFillCaretRight,
	AiFillForward,
} from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import { useDebouncedCallback } from "use-debounce";

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
				"px-2 border-1 border-custom bg-card hover:bg-gray-500 disabled:bg-surface disabled:cursor-not-allowed",
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
				symbol={<AiFillBackward />}
				onChange={() => table.firstPage()}
				className="rounded-l-md"
			/>
			<SwitchPageButton
				disabled={!table.getCanPreviousPage()}
				symbol={<AiFillCaretLeft />}
				onChange={useDebouncedCallback(() => table.previousPage(), 200)}
			/>
			<p className="px-4 border-y-1 border-custom bg-card">
				{table.getState().pagination.pageIndex + 1} of{" "}
				{table.getPageCount().toLocaleString()}
			</p>
			<SwitchPageButton
				disabled={!table.getCanNextPage()}
				symbol={<AiFillCaretRight />}
				onChange={useDebouncedCallback(() => table.nextPage(), 200)}
			/>
			<SwitchPageButton
				disabled={!table.getCanNextPage()}
				symbol={<AiFillForward />}
				onChange={() => table.lastPage()}
				className="rounded-r-md"
			/>
		</div>
	);
}
