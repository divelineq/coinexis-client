import { type HeaderGroup, flexRender } from "@tanstack/react-table";

type Props = {
	headers: HeaderGroup<any>[];
};

export function HeaderGroups({ headers }: Props) {
	return headers.map((headerGroup) => (
		<div key={headerGroup.id} className="flex gap-3 border ">
			{headerGroup.headers.map((header) => (
				<div
					key={header.id}
					className="p-2 border-r-2"
					style={{ width: header.getSize() * 2 }}
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
				</div>
			))}
		</div>
	));
}
