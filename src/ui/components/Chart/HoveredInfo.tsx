import type { OhlcData } from "lightweight-charts";

type Props = {
	data: (OhlcData & { color?: string }) | null;
};

function HoveredInfo({ data }: Props) {
	if (!data || !data.open || !data.high || !data.low || !data.close) return;
	return (
		<p className="absolute top-6 left-2 z-10 p-2 tabular-nums flex gap-2 text-zinc-400">
			<span>
				O:{" "}
				<span style={{ color: data.color }}>
					{data.open.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
			</span>
			<span>
				H:{" "}
				<span style={{ color: data.color }}>
					{data.high.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
			</span>
			<span>
				L:{" "}
				<span style={{ color: data.color }}>
					{data.low.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
			</span>
			<span>
				C:{" "}
				<span style={{ color: data.color }}>
					{data.close.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
			</span>
		</p>
	);
}

export { HoveredInfo };
