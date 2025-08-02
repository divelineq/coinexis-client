import {
	CandlestickSeries,
	type CandlestickStyleOptions,
	type ChartOptions,
	ColorType,
	CrosshairMode,
	type DeepPartial,
	type IChartApi,
	type ISeriesApi,
	LineSeries,
	type OhlcData,
	type Time,
	createChart,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

const CANDLESTICK_COLORS: Partial<CandlestickStyleOptions> = {
	upColor: "#26a69a",
	downColor: "#ef5350",
	borderVisible: true,
	wickUpColor: "#26a69a",
	wickDownColor: "#ef5350",
};

const CHART_OPTIONS = {
	autoScale: true,
	layout: {
		background: { type: ColorType.Solid, color: "#101014" },
		textColor: "white",
	},
	autoSize: true,
	grid: {
		vertLines: {
			color: "#212121",
		},
		horzLines: {
			color: "#212121",
		},
	},
	crosshair: {
		mode: CrosshairMode.Normal,
		horzLine: {
			visible: true,
			color: "white",
			labelVisible: true,
		},
		vertLine: {
			visible: true,
			color: "white",
			labelVisible: true,
		},
	},
} as DeepPartial<ChartOptions>;

type Props = {
	data: OhlcData[];
	newData: OhlcData;
	className?: string;
	chartStyle?: { width: number; height: number };
};

function Chart({ data, newData }: Props) {
	const chartRef = useRef<IChartApi | null>(null);
	const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const newDataRef = useRef<OhlcData | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const lineData = data.map((item) => ({
			time: item.time,
			value: (item.open + item.close) / 2,
		}));

		const chart = createChart(containerRef.current, CHART_OPTIONS);
		chart.timeScale().fitContent();
		chartRef.current = chart;

		const lineSeries = chart.addSeries(LineSeries, {
			lineWidth: 1,
			color: "#fff",
			lastValueVisible: false,
			crosshairMarkerVisible: false,
		});
		lineSeries.setData(lineData);

		const candlestickSeries = chart.addSeries(
			CandlestickSeries,
			CANDLESTICK_COLORS,
		);
		candlestickSeries.setData(data);
		candlestickSeriesRef.current = candlestickSeries;

		const handleResize = () => {
			chart.applyOptions({ width: containerRef.current?.clientWidth });
		};

		const from = data.length - 100;
		const to = data.length - 1;

		chart.timeScale().setVisibleRange({
			from: data[from].time,
			to: (Number(data[to].time) + 10) as Time,
		});

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);

			chart.remove();
		};
	}, []);

	useEffect(() => {
		if (newDataRef.current !== newData) {
			candlestickSeriesRef.current?.update(newData);
			newDataRef.current = newData;
		}
	}, [newData, candlestickSeriesRef.current]);

	return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

export { Chart };
