import type { Level } from "../types";

type Props = {
	data: Level[];
	color: string;
};

function OrderbookList({ data, color }: Props) {
	if (!data || data.length === 0) {
		return Array.from({ length: 10 }, (_, i) => (
			<div key={i} className="flex gap-4 items-center justify-between my-2">
				<div className="h-4 w-24 bg-zinc-800 animate-pulse rounded" />
				<div className="h-4 w-16 bg-zinc-800 animate-pulse rounded" />
			</div>
		));
	}

	return (
		<>
			{data.slice(0, 10).map(([price, amount]) => (
				<div key={price} className="grid grid-cols-2 gap-4">
					<div
						className="text-left"
						style={{
							color,
							fontVariantNumeric: "tabular-nums",
							fontFamily:
								"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
							whiteSpace: "nowrap",
						}}
					>
						{Number(price).toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</div>
					<div
						className="text-right"
						style={{
							fontVariantNumeric: "tabular-nums",
							fontFamily:
								"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
						}}
					>
						{Number(amount).toLocaleString("en-US", {
							minimumFractionDigits: 3,
							maximumFractionDigits: 3,
						})}
					</div>
				</div>
			))}
		</>
	);
}

export { OrderbookList };
