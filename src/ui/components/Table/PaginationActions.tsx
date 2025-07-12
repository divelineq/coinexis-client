import type { Table } from "@tanstack/react-table";
import { type ChangeEvent, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../Input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "../Pagination";

type Props = {
	table: Table<any>;
	isRefetching?: boolean;
};

export function PaginationActions({ table, isRefetching }: Props) {
	const [search, setSearch] = useState<string>(
		(table.getState().pagination.pageIndex + 1).toString(),
	);

	const debouncedSetPage = useDebouncedCallback(
		(value: number) => table.setPageIndex(value - 1),
		700,
	);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const regex = new RegExp(/^\d*$/);
		const value = e.target.value;
		const maxPage = table.getPageCount();

		setSearch(value);

		if (+value > maxPage) {
			toast.info(`Всего ${maxPage} страниц`, { duration: 4000 });
			return;
		}

		if (!regex.test(value) || value === "") {
			return;
		}

		debouncedSetPage(+value);
	};

	const handlePrevPage = () => {
		const pageIndex = table.getState().pagination.pageIndex + 1;

		if (pageIndex === 0) {
			return;
		}

		setSearch((pageIndex - 1).toString());

		table.previousPage();
	};

	const handleNextPage = () => {
		const pageIndex = table.getState().pagination.pageIndex + 1;
		const maxPage = table.getPageCount();

		if (pageIndex === maxPage) {
			return;
		}

		setSearch((pageIndex + 1).toString());
		table.nextPage();
	};

	return (
		<Pagination>
			{isRefetching && (
				<PulseLoader
					size={6}
					color="rgb(238, 238, 238)"
					className="pr-2 items-center"
				/>
			)}
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious onClick={handlePrevPage} />
				</PaginationItem>
				<PaginationItem>
					<Input
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						className="max-w-14"
						inputClassName="text-center"
						placeholder="#"
						value={search}
						onChange={handleSearchChange}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext onClick={handleNextPage} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
		// 	<div className="flex py-2">
		// 		{isRefetching && (
		// 			<PulseLoader
		// 				size={6}
		// 				color="rgb(238, 238, 238)"
		// 				className="pr-2 items-center"
		// 			/>
		// 		)}
		// 		<SwitchPageButton
		// 			disabled={!table.getCanPreviousPage()}
		// 			symbol={<AiFillBackward />}
		// 			onChange={() => table.firstPage()}
		// 			className="rounded-l-md"
		// 		/>
		// 		<SwitchPageButton
		// 			disabled={!table.getCanPreviousPage()}
		// 			symbol={<AiFillCaretLeft />}
		// 			onChange={useDebouncedCallback(() => table.previousPage(), 200)}
		// 		/>
		// 		<p className="px-4 border-y-1 border-custom bg-card">
		// 			{table.getState().pagination.pageIndex + 1} of{" "}
		// 			{table.getPageCount().toLocaleString()}
		// 		</p>
		// 		<SwitchPageButton
		// 			disabled={!table.getCanNextPage()}
		// 			symbol={<AiFillCaretRight />}
		// 			onChange={useDebouncedCallback(() => table.nextPage(), 200)}
		// 		/>
		// 		<SwitchPageButton
		// 			disabled={!table.getCanNextPage()}
		// 			symbol={<AiFillForward />}
		// 			onChange={() => table.lastPage()}
		// 			className="rounded-r-md"
		// 		/>
		// </div>
	);
}
