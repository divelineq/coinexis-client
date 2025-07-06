import { type RowModel, flexRender } from "@tanstack/react-table";

type Props = {
	rowModel: RowModel<any>;
};

export function Rows({ rowModel }: Props) {
	return (
		<div className="border-b border-custom">
			{rowModel.rows.map((row) => (
				<div key={row.id} className="flex border-b border-custom h-20">
					{row.getVisibleCells().map((cell) => {
						const size = cell.column.getSize();

						return (
							<div
								key={cell.id}
								className="p-3 overflow-hidden"
								style={{
									width: size ? `${size}px` : "100%",
								}}
							>
								<div className={"flex items-center h-full text-sm"}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</div>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
