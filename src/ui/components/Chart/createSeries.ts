import {
	CandlestickSeries,
	type IChartApi,
	LineSeries,
	type OhlcData,
} from "lightweight-charts";
import { CANDLESTICK_COLORS } from "./Consts";

const createLineData = (data: OhlcData[]) =>
	data.map((item) => ({
		time: item.time,
		value: (item.open + item.close) / 2,
	}));

export function createSeries(chart: IChartApi, initialSlice: OhlcData[]) {
	const lineData = createLineData(initialSlice);

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
