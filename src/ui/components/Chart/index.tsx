import {
	type IChartApi,
	type ISeriesApi,
	type OhlcData,
	type Time,
	createChart,
} from "lightweight-charts";
import { useCallback, useEffect, useRef, useState } from "react";
import { CHART_OPTIONS } from "./Consts";
import { HoveredInfo } from "./HoveredInfo";
import { IntervalButtons } from "./IntervalButtons";
import { buildHoveredColor } from "./buildHoveredColor";
import { createSeries } from "./createSeries";
import { crosshairMove } from "./crosshairMove";
import { setupVisibleRange } from "./setupVisibleRange";

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
	>({ ...data.at(-1)!, color: buildHoveredColor(data.at(-1)!) });

	const chartRef = useRef<IChartApi | null>(null);
	const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const newDataRef = useRef<OhlcData>(data.at(-1)!);
	const loadedRangeRef = useRef<OhlcData[]>([]);
	const loadIndexRef = useRef<number>(data.length - LOAD_BATCH);
	const timestampRef = useRef<Time | undefined>(null);
	const openRef = useRef<number | undefined>(null);

	const handleVisibleRangeChange = useCallback(
		() => (range: any) => {
			if (!range || !candlestickSeriesRef.current) return;

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
		},
		[data],
	);

	const initializeChart = useCallback(() => {
		if (!containerRef.current) return;

		//? для того что бы при изменении интервала не создавал новую свечу
		timestampRef.current = data.at(-1)?.time;
		openRef.current = data.at(-1)?.open;

		const initialSlice = data.slice(-LOAD_BATCH);
		loadedRangeRef.current = initialSlice;

		const chart = createChart(containerRef.current, CHART_OPTIONS);
		chart.applyOptions({});
		chartRef.current = chart;

		setupVisibleRange(chart, data.length);

		const candlestickSeries = createSeries(chart, initialSlice);
		candlestickSeriesRef.current = candlestickSeries;

		chart.subscribeCrosshairMove(
			crosshairMove(candlestickSeries, setHoveredData, newDataRef.current),
		);
		chart
			.timeScale()
			.subscribeVisibleLogicalRangeChange(handleVisibleRangeChange());

		const handleResize = () => {
			chart.applyOptions({ width: containerRef.current?.clientWidth });
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			chart.remove();
		};
	}, [
		data,
		setupVisibleRange,
		createSeries,
		crosshairMove,
		handleVisibleRangeChange,
	]);

	const updateNewData = useCallback(() => {
		if (!newData || newDataRef.current === newData) return;

		const lastBar = loadedRangeRef.current.at(-1);
		if (!lastBar || newData.time < lastBar.time) return;

		if (newData.open !== openRef.current) {
			openRef.current = newData.open;
			timestampRef.current = newData.time;
		}

		const currentNewData: OhlcData<Time> = {
			...newData,
			time: timestampRef.current as Time,
		};

		candlestickSeriesRef.current?.update(currentNewData);
		setHoveredData({
			...currentNewData,
			color: buildHoveredColor(currentNewData),
		});
		loadedRangeRef.current[loadedRangeRef.current.length - 1] = currentNewData;
		newDataRef.current = currentNewData;
	}, [newData]);

	useEffect(() => {
		return initializeChart();
	}, [initializeChart]);

	useEffect(() => {
		updateNewData();
	}, [updateNewData]);

	return (
		<div className="relative" ref={containerRef} style={{ width, height }}>
			<IntervalButtons value={interval} onChange={onIntervalChange} />
			<HoveredInfo data={hoveredData} />
		</div>
	);
}

export { Chart };
