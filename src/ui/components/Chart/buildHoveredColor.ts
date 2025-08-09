import type { OhlcData } from "lightweight-charts";

export function buildHoveredColor(data: OhlcData) {
	if (!data) return "text-zinc-400";

	return data.close > data.open ? "var(--buy-color)" : "var(--sell-color)";
}
