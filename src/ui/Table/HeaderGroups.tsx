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
			{headerGroup.headers.map((header) => (
				<div
					key={header.id}
					className="p-2 border-r border-gray-500"
					style={{ width: header.getSize() }}
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
				</div>
			))}
		</div>
	));
}
