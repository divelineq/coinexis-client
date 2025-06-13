import { type RowModel, flexRender } from "@tanstack/react-table";
import cx from "classix";

type Props = {
	rowModel: RowModel<any>;
};

export function Rows({ rowModel }: Props) {
	return (
		<div className="border border-gray-500 rounded-b-sm">
			{rowModel.rows.map((row) => (
				<div key={row.id} className="flex border-b border-gray-500">
					{row.getVisibleCells().map((cell) => (
						<div
							key={cell.id}
							className="p-3 border-r border-gray-500 overflow-hidden"
							style={{ width: cell.column.getSize() }}
						>
							<div className={cx("flex items-center text-sm")}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
