import { type Row, type RowModel, flexRender } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";

type Props = {
	rowModel: RowModel<any>;
	virtualizer: Virtualizer<HTMLDivElement, Element>;
	rowHeight?: number;
	shouldShowSkeleton: boolean;
	disabled?: boolean;
	onClick?: (row: Row<any>) => void;
};

function Rows({
	rowModel,
	virtualizer,
	shouldShowSkeleton,
	onClick,
	rowHeight = 80,
}: Props) {
	//! по непонятной причине виртуалайзер не работает с компайлером
	"use no memo";

	const isDisabled = !onClick;

	//TODO: сейчас даже если не надо строка кликабельная и может перекидывать куда попало пофиксить
	return (
		<div
			className="relative"
			style={{ height: `${virtualizer.getTotalSize()}px` }}
		>
			{virtualizer.getVirtualItems().map((virtualRow) => {
				const row = rowModel.rows[virtualRow.index];

				return (
					<button
						disabled={isDisabled}
						key={row.id}
						className={`absolute flex w-full items-center text-sm ${
							virtualRow.index % 2 !== 0 ? "bg-muted/30" : "bg-background"
						} hover:bg-muted/50 border-b border-border transition`}
						style={{
							transform: `translateY(${virtualRow.start}px)`,
							height: `${rowHeight}px`,
						}}
						onClick={() => onClick?.(row)}
					>
						{row.getVisibleCells().map((cell) => (
							<div
								key={cell.id}
								className="px-4 py-2 overflow-hidden"
								style={{ width: `${cell.column.getSize()}px` }}
							>
								<div className="flex items-center h-full">
									{shouldShowSkeleton && cell.column.id !== "#" ? (
										<div className="animate-pulse h-5 w-full rounded bg-accent" />
									) : (
										flexRender(cell.column.columnDef.cell, cell.getContext())
									)}
								</div>
							</div>
						))}
					</button>
				);
			})}
		</div>
	);
}

export { Rows };
