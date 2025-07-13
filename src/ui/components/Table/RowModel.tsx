import { type RowModel, flexRender } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";

type Props = {
	rowModel: RowModel<any>;
	virtualizer: Virtualizer<HTMLDivElement, Element>;
	rowHeight?: number;
	shouldShowSkeleton: boolean;
};

export function Rows({
	rowModel,
	virtualizer,
	shouldShowSkeleton,
	rowHeight = 80,
}: Props) {
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
						{row.getVisibleCells().map((cell) => (
							<div
								key={cell.id}
								className="px-3 overflow-hidden"
								style={{ width: `${cell.column.getSize()}px` }}
							>
								<div className="flex items-center h-full text-sm">
									{shouldShowSkeleton && cell.column.id !== "#" ? (
										<div className="animate-pulse h-6 w-full rounded-sm bg-accent" />
									) : (
										flexRender(cell.column.columnDef.cell, cell.getContext())
									)}
								</div>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
}
