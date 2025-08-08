import {
	CandlestickSeries,
	type IChartApi,
	type ISeriesApi,
	LineSeries,
	type OhlcData,
	createChart,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { CANDLESTICK_COLORS, CHART_OPTIONS } from "./Consts";
import { HoveredInfo } from "./HoveredInfo";
import { IntervalButtons } from "./IntervalButtons";

type Props = {
	data: OhlcData[];
	newData?: OhlcData | null;
	className?: string;
	chartStyle?: { width: number; height: number };
	width?: string;
	height?: string;
	interval: string;
	onIntervalChange: (interval: string) => void;
};

const LOAD_BATCH = 200;
const VISIBLE_BAR = 120;

function Chart({
	data,
	newData,
	width,
	height,
	interval,
	onIntervalChange,
}: Props) {
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
		chart.applyOptions({});
		const timeScale = chart.timeScale();

		const totalBars = data.length;

		if (totalBars >= VISIBLE_BAR) {
			setTimeout(() => {
				chart.timeScale().setVisibleLogicalRange({
					from: data.length - VISIBLE_BAR,
					to: totalBars - 1,
				});
				chart.timeScale().scrollToRealTime();
			}, 0);
		} else {
			chart.timeScale().fitContent();
		}

		chartRef.current = chart;

		timeScale.fitContent();

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

		timeScale.subscribeVisibleLogicalRangeChange((range) => {
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

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);

			chart.remove();
		};
	}, [data]);

	useEffect(() => {
		if (newData && newDataRef.current !== newData) {
			const lastBar = loadedRangeRef.current.at(-1);

			if (lastBar && newData.time >= lastBar.time) {
				candlestickSeriesRef.current?.update(newData);
				loadedRangeRef.current[loadedRangeRef.current.length - 1] = newData;
				newDataRef.current = newData;
			}
		}
	}, [newData, candlestickSeriesRef.current]);

	return (
		<div className="relative" ref={containerRef} style={{ width, height }}>
			<IntervalButtons value={interval} onChange={onIntervalChange} />
			<HoveredInfo data={hoveredData} />
		</div>
	);
}

export { Chart };
