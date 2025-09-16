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
	interval: string;
	onIntervalChange: (interval: string) => void;
	getPrevData?: () => void;
};

function Chart({
	data,
	newData,
	interval,
	onIntervalChange,
	getPrevData,
}: Props) {
	const [hoveredData, setHoveredData] = useState<
		(OhlcData & { color?: string }) | null
	>({ ...data.at(-1)!, color: buildHoveredColor(data.at(-1)!) });

	const chartRef = useRef<IChartApi | null>(null);
	const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const newDataRef = useRef<OhlcData>(data.at(-1)!);
	const loadedRangeRef = useRef<OhlcData[]>([]);
	const hasCalledRef = useRef(false);
	const timestampRef = useRef<Time | undefined>(null);
	const openRef = useRef<number | undefined>(null);

	useEffect(() => {
		if (candlestickSeriesRef.current && data.length > 0) {
			timestampRef.current = data.at(-1)?.time;
			openRef.current = data.at(-1)?.open;
			candlestickSeriesRef.current.setData(data);
		}
	}, [data]);

	const handleVisibleRangeChange = useCallback(
		() => (range: any) => {
			if (!range || !candlestickSeriesRef.current) return;

			if (range.from < 10) {
				if (!hasCalledRef.current) {
					getPrevData?.();
					hasCalledRef.current = true;
				}
			} else {
				hasCalledRef.current = false;
			}
		},
		[],
	);

	const initializeChart = useCallback(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, CHART_OPTIONS);
		chart.applyOptions({});
		chartRef.current = chart;

		setupVisibleRange(chart, data.length);

		const candlestickSeries = createSeries(chart, data);
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
	}, []);

	const updateNewData = useCallback(() => {
		if (!newData || newDataRef.current === newData) return;

		const lastBar = data.at(-1);
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
		<div
			className="relative"
			ref={containerRef}
			style={{ width: "100%", height: "100%" }}
		>
			<IntervalButtons value={interval} onChange={onIntervalChange} />
			<HoveredInfo data={hoveredData} />
		</div>
	);
}

export { Chart };
