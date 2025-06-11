import { type HeaderGroup, flexRender } from "@tanstack/react-table";

type Props = {
	headers: HeaderGroup<any>[];
};

export function HeaderGroups({ headers }: Props) {
	return headers.map((headerGroup) => (
		<div
			key={headerGroup.id}
			className="flex border border-gray-500 rounded-t-sm"
		>
			{headerGroup.headers.map((header) => {
				return (
					<div
						key={header.id}
						className="px-2 py-1 border-r border-gray-500 flex gap-2 "
						style={{ width: header.getSize() }}
					>
						{flexRender(header.column.columnDef.header, header.getContext())}
						{header.column.getCanSort() && (
							<button
								className="cursor-pointer px-2 "
								onClick={() => header.column.toggleSorting()}
							>
								{header.column.getIsSorted() === "asc"
									? "↑"
									: header.column.getIsSorted() === "desc"
										? "↓"
										: "⇅"}
							</button>
						)}
					</div>
				);
			})}
		</div>
	));
}
