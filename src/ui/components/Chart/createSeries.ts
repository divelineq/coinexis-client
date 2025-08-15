import {
	CandlestickSeries,
	type IChartApi,
	LineSeries,
	type OhlcData,
} from "lightweight-charts";
import { CANDLESTICK_COLORS } from "./Consts";

export function createSeries(chart: IChartApi, initialSlice: OhlcData[]) {
	const lineData = initialSlice.map(({ time, open, close }) => ({
		time,
		value: (open + close) / 2,
	}));

	const lineSeries = chart.addSeries(LineSeries, {
		lineWidth: 1,
		color: "#fff",
		lastValueVisible: false,
		crosshairMarkerVisible: false,
		priceLineVisible: false,
	});
	lineSeries.setData(lineData);

	const candlestickSeries = chart.addSeries(
		CandlestickSeries,
		CANDLESTICK_COLORS,
	);
	candlestickSeries.setData(initialSlice);

	return candlestickSeries;
}
