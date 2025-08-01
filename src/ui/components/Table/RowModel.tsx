import { useNavigate } from "@tanstack/react-router";
import { type RowModel, flexRender } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";

type Props = {
	rowModel: RowModel<any>;
	virtualizer: Virtualizer<HTMLDivElement, Element>;
	rowHeight?: number;
	shouldShowSkeleton: boolean;
};

function Rows({
	rowModel,
	virtualizer,
	shouldShowSkeleton,
	rowHeight = 80,
}: Props) {
	const navigate = useNavigate();

	const handleClick = (coin: string) => {
		navigate({
			to: "/market/$coin",
			params: { coin },
		});
	};

	return (
		<div
			className="relative"
			style={{ height: `${virtualizer.getTotalSize()}px` }}
		>
			{virtualizer.getVirtualItems().map((virtualRow) => {
				const row = rowModel.rows[virtualRow.index];
				const isOdd = virtualRow.index % 2 !== 0;

				return (
					<button
						key={row.id}
						className={`absolute flex w-full items-center text-sm ${
							isOdd ? "bg-muted/30" : "bg-background"
						} hover:bg-muted/50 border-b border-border transition`}
						style={{
							transform: `translateY(${virtualRow.start}px)`,
							height: `${rowHeight}px`,
						}}
						onClick={() => {
							handleClick(row.original.symbol);
						}}
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
