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
							className="p-3 border-r border-gray-500 box-border overflow-auto"
							style={{ width: cell.column.getSize() }}
						>
							<div
								className={cx(
									"flex h-full items-center truncate",
									cell.column.id === "name" || cell.column.id === "asset_name"
										? "justify-start"
										: "justify-center",
								)}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
