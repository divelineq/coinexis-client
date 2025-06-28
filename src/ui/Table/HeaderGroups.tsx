import { type HeaderGroup, flexRender } from "@tanstack/react-table";
import {
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineFilter,
} from "react-icons/ai";

type Props = {
	headers: HeaderGroup<any>[];
};

export function HeaderGroups({ headers }: Props) {
	return headers.map((headerGroup) => (
		<div
			key={headerGroup.id}
			className="flex border border-custom rounded-t-sm bg-card"
		>
			{headerGroup.headers.map((header) => {
				return (
					<div
						key={header.id}
						className="px-2 py-1 border-r border-custom flex gap-1"
						style={{ width: header.getSize() }}
					>
						{flexRender(header.column.columnDef.header, header.getContext())}
						{header.column.getCanSort() && (
							<button
								className="cursor-pointer"
								onClick={() => header.column.toggleSorting()}
							>
								{header.column.getIsSorted() === "asc" ? (
									<AiOutlineArrowUp />
								) : header.column.getIsSorted() === "desc" ? (
									<AiOutlineArrowDown />
								) : (
									<AiOutlineFilter />
								)}
							</button>
						)}
					</div>
				);
			})}
		</div>
	));
}
