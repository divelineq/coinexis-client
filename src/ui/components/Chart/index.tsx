import {
	CandlestickSeries,
	type CandlestickStyleOptions,
	type ChartOptions,
	ColorType,
	CrosshairMode,
	type DeepPartial,
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

type Props = {
	data: OhlcData[];
	className?: string;
};

function Chart({ data }: Props) {
	const candlestickSeries = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const chart = createChart(candlestickSeries.current!, {
			layout: {
				background: { type: ColorType.Solid, color: "#323333" },
				textColor: "white",
			},
			width: candlestickSeries.current?.clientWidth,
			height: 600,
			autoSize: true,
			timeScale: {
				rightOffset: 10,
				rightBarStaysOnScroll: true,
			},
			grid: {
				vertLines: {
					color: "#4f4f4f",
				},
				horzLines: {
					color: "#4f4f4f",
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
		} as DeepPartial<ChartOptions>);
		chart.timeScale().fitContent();

		const newSeries = chart.addSeries(CandlestickSeries, CANDLESTICK_COLORS);
		newSeries.setData(data);

		const handleResize = () => {
			chart.applyOptions({ width: candlestickSeries.current?.clientWidth });
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
	}, [data]);

	return <div ref={candlestickSeries} />;
}

export { Chart };
