import { type HeaderGroup, flexRender } from "@tanstack/react-table";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

type Props = {
	headers: HeaderGroup<any>[];
};

export function HeaderGroups({ headers }: Props) {
	return headers.map((headerGroup) => (
		<div
			key={headerGroup.id}
			className="flex h-12 border-y border-custom items-center"
		>
			{headerGroup.headers.map((header) => {
				const canSort = header.column.getCanSort();
				const sorted = header.column.getIsSorted();

				return (
					<div
						key={header.id}
						className="px-3 py-1 flex items-center"
						style={{
							width: header.getSize() ? `${header.getSize()}px` : "100%",
						}}
					>
						{canSort ? (
							<button
								className="cursor-pointer flex items-center gap-1"
								onClick={() => header.column.toggleSorting()}
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
								{sorted === "asc" ? (
									<AiOutlineArrowUp />
								) : sorted === "desc" ? (
									<AiOutlineArrowDown />
								) : null}
							</button>
						) : (
							flexRender(header.column.columnDef.header, header.getContext())
						)}
					</div>
				);
			})}
		</div>
	));
}
