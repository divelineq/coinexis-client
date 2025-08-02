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
import { useEffect, useRef, useState } from "react";
import { HoveredInfo } from "./HoveredInfo";

const CANDLESTICK_COLORS: Partial<CandlestickStyleOptions> = {
	upColor: "#20B26C",
	downColor: "#EF454A",
	borderVisible: true,
	wickUpColor: "#20B26C",
	wickDownColor: "#EF454A",
};

const CHART_OPTIONS = {
	// autoSize: true,
	autoScale: true,
	crosshairMarkerVisible: false,
	crosshairMarkerRadius: 0,
	timeScale: {
		timeVisible: true,
		secondsVisible: false,
		tickMarkFormatter: (time: number) => {
			const date = new Date(time * 1000);
			const hours = String(date.getHours()).padStart(2, "0");
			const minutes = String(date.getMinutes()).padStart(2, "0");

			return `${hours}:${minutes}`;
		},
	},

	layout: {
		background: { type: ColorType.Solid, color: "#101014" },
		textColor: "#525252",
		fontSize: 10,
	},

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
	width?: string;
	height?: string;
};

const LOAD_BATCH = 200;

function Chart({ data, newData, width, height }: Props) {
	const [hoveredData, setHoveredData] = useState<
		(OhlcData & { color?: string }) | null
	>(data.at(-1)!);
	const chartRef = useRef<IChartApi | null>(null);
	const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const newDataRef = useRef<OhlcData | null>(null);
	const loadedRangeRef = useRef<OhlcData[]>([]);
	const loadIndexRef = useRef<number>(data.length - LOAD_BATCH);

	useEffect(() => {
		if (!containerRef.current) return;

		const initialSlice = data.slice(-LOAD_BATCH);
		loadedRangeRef.current = initialSlice;

		const lineData = initialSlice.map((item) => ({
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
			priceLineVisible: false,
		});
		lineSeries.setData(lineData);

		const candlestickSeries = chart.addSeries(
			CandlestickSeries,
			CANDLESTICK_COLORS,
		);
		candlestickSeries.setData(initialSlice);
		candlestickSeriesRef.current = candlestickSeries;

		chart.subscribeCrosshairMove((param) => {
			if (!param.time && !param.hoveredSeries) {
				setHoveredData(newDataRef.current);
				return;
			}

			const ohlcData = param.seriesData.get(candlestickSeries) as OhlcData;
			setHoveredData({
				...ohlcData,
				color:
					ohlcData?.close > ohlcData?.open
						? "var(--buy-color)"
						: "var(--sell-color)",
			});
		});

		chart.timeScale().subscribeVisibleLogicalRangeChange((range) => {
			if (!range) return;
			if (!candlestickSeriesRef.current) return;

			const visibleFrom = Number(range.from);
			const total = loadedRangeRef.current.length;
			if (total === 0) return;

			const threshold = total * 0.1;
			if (visibleFrom <= threshold) {
				const nextStart = Math.max(0, loadIndexRef.current - LOAD_BATCH);
				if (nextStart === loadIndexRef.current) return;

				const newData = data.slice(nextStart, loadIndexRef.current);
				loadIndexRef.current = nextStart;

				loadedRangeRef.current = [...newData, ...loadedRangeRef.current];
				candlestickSeriesRef.current.setData(loadedRangeRef.current);
			}
		});

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

	return (
		<div className="relative" ref={containerRef} style={{ width, height }}>
			<HoveredInfo data={hoveredData} />
		</div>
	);
}

export { Chart };
