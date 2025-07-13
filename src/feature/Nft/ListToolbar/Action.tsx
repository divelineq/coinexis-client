import type { PaginationState } from "@tanstack/react-table";
import {
	Input,
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@ui";
import { type ChangeEvent, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import type { ServiceOutput } from "src/service/nft/types";
import { useDebouncedCallback } from "use-debounce";

type Props = {
	isRefetching: boolean;
	pagination: PaginationState & ServiceOutput["pagination"];
	onPageChange: (page: { pageIndex: number; pageSize: number }) => void;
};

export function Action({ pagination, isRefetching, onPageChange }: Props) {
	const [search, setSearch] = useState((pagination.pageIndex + 1).toString());

	const debouncedSetPage = useDebouncedCallback(
		(value: number) => onPageChange({ ...pagination, pageIndex: +value - 1 }),
		700,
	);

	const handlePageChange = (delta: number) => {
		const regex = new RegExp(/^\d*$/);
		const value = pagination.pageIndex + delta;
		const maxPage = Math.ceil(pagination.total / pagination.limit);

		if (value < 0) {
			return;
		}

		setSearch((value + 1).toString());

		if (+value > maxPage) {
			toast.info(`Всего ${maxPage} страниц`, { duration: 4000 });
			return;
		}

		if (!regex.test(value.toString()) || value.toString() === "") {
			return;
		}

		onPageChange({
			...pagination,
			pageIndex: value,
		});
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const regex = new RegExp(/^\d*$/);
		const value = e.target.value;
		const maxPage = Math.ceil(pagination.total / pagination.limit);

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
					<PaginationPrevious onClick={() => handlePageChange(-1)} />
				</PaginationItem>
				<PaginationItem>
					<Input
						className="max-w-14"
						inputClassName="text-center"
						placeholder={Math.floor(
							pagination.total / pagination.limit,
						).toString()}
						value={search}
						onChange={handleSearchChange}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext onClick={() => handlePageChange(1)} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
