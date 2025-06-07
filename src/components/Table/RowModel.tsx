import { type RowModel, flexRender } from "@tanstack/react-table";

type Props = {
	rowModel: RowModel<any>;
};

export function Rows({ rowModel }: Props) {
	return rowModel.rows.map((row) => (
		<div key={row.id} className="flex gap-3 border border-gray-500">
			{row.getVisibleCells().map((cell) => (
				<div
					key={cell.id}
					className="p-2 border-r border-gray-500"
					style={{ width: cell.column.getSize() }}
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</div>
			))}
		</div>
	));
}
