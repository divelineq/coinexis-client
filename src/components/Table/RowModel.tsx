import { type RowModel, flexRender } from "@tanstack/react-table";

type Props = {
	rowModel: RowModel<any>;
};

export function Rows({ rowModel }: Props) {
	return rowModel.rows.map((row) => (
		<div key={row.id} className="flex gap-3 border ">
			{row.getVisibleCells().map((cell) => (
				<div
					key={cell.id}
					className="p-2 border-r-2"
					style={{ width: cell.column.getSize() * 2 }}
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</div>
			))}
		</div>
	));
}
