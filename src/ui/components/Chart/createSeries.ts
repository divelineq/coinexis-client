import {
	CandlestickSeries,
	type IChartApi,
	type OhlcData,
} from "lightweight-charts";
import { CANDLESTICK_COLORS } from "./Consts";

export function createSeries(chart: IChartApi, initialSlice: OhlcData[]) {
	const candlestickSeries = chart.addSeries(
		CandlestickSeries,
		CANDLESTICK_COLORS,
	);
	candlestickSeries.setData(initialSlice);

	return candlestickSeries;
}
