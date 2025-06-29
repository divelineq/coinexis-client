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
				return (
					<div
						key={header.id}
						className="px-4 py-1 flex"
						style={{ width: header.getSize() }}
					>
						{header.column.getCanSort() && (
							<button
								className="cursor-pointer flex items-center"
								onClick={() => header.column.toggleSorting()}
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}

								{header.column.getIsSorted() === "asc" ? (
									<AiOutlineArrowUp />
								) : header.column.getIsSorted() === "desc" ? (
									<AiOutlineArrowDown />
								) : null}
							</button>
						)}
					</div>
				);
			})}
		</div>
	));
}
