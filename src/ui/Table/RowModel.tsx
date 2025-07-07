import { type RowModel, flexRender } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";

type Props = {
	rowModel: RowModel<any>;
	virtualizer: Virtualizer<HTMLDivElement, Element>;
	rowHeight?: number;
};

export function Rows({ rowModel, virtualizer, rowHeight = 80 }: Props) {
	return (
		<div
			className="relative border-b border-custom"
			style={{ height: `${virtualizer.getTotalSize()}px` }}
		>
			{virtualizer.getVirtualItems().map((virtualRow) => {
				const row = rowModel.rows[virtualRow.index];

				return (
					<div
						key={row.id}
						className="absolute flex border-b border-custom w-full"
						style={{
							transform: `translateY(${virtualRow.start}px)`,
							height: `${rowHeight}px`,
						}}
					>
						{row.getVisibleCells().map((cell) => {
							const size = cell.column.getSize();

							return (
								<div
									key={cell.id}
									className="px-3 overflow-hidden"
									style={{ width: `${size}px` }}
								>
									<div className="flex items-center h-full text-sm">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
