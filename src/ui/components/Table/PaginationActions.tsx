import type { Table } from "@tanstack/react-table";
import { type ChangeEvent, useState } from "react";
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
};

export function PaginationActions({ table }: Props) {
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
						placeholder={table.getPageCount().toString()}
						value={search}
						onChange={handleSearchChange}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext onClick={handleNextPage} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
