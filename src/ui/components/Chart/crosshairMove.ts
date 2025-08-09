import type { ISeriesApi, OhlcData } from "lightweight-charts";
import { buildHoveredColor } from "./buildHoveredColor";

export function crosshairMove(
	candlestickSeries: ISeriesApi<"Candlestick">,
	onHoveredChange: (data: (OhlcData & { color?: string }) | null) => void,
	fallback: OhlcData,
) {
	return (param: any) => {
		if (!param.time && !param.hoveredSeries) {
			onHoveredChange(fallback);
			return;
		}

		const ohlcData = param.seriesData.get(candlestickSeries) as OhlcData;
		onHoveredChange({
			...ohlcData,
			color: buildHoveredColor(ohlcData),
		});
	};
}
