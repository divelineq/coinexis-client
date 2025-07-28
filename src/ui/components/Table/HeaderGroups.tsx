import { type HeaderGroup, flexRender } from "@tanstack/react-table";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

type Props = {
	headers: HeaderGroup<any>[];
};

function HeaderGroups({ headers }: Props) {
	return headers.map((headerGroup) => (
		<div
			key={headerGroup.id}
			className="flex h-14 bg-background sticky top-0 z-10 shadow-sm border-b border-border"
		>
			{headerGroup.headers.map((header) => {
				const canSort = header.column.getCanSort();
				const sorted = header.column.getIsSorted();

				return (
					<div
						key={header.id}
						className="px-4 py-2 flex items-center font-medium text-muted-foreground text-sm select-none"
						style={{
							width: header.getSize() ? `${header.getSize()}px` : "100%",
						}}
					>
						{canSort ? (
							<button
								className="cursor-pointer flex items-center gap-1 hover:text-foreground transition"
								onClick={() => header.column.toggleSorting()}
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
								{sorted === "asc" ? (
									<AiOutlineArrowUp className="text-xs" />
								) : sorted === "desc" ? (
									<AiOutlineArrowDown className="text-xs" />
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

export { HeaderGroups };
