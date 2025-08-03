import type { CandlestickStyleOptions } from "lightweight-charts";
import {
	type ChartOptions,
	ColorType,
	CrosshairMode,
	type DeepPartial,
} from "lightweight-charts";

export const INTERVALS = {
	1: "1m",
	3: "3m",
	5: "5m",
	15: "15m",
	30: "30m",
	60: "1H",
	240: "4H",
	D: "1D",
	W: "1W",
	M: "1M",
};

export const CANDLESTICK_COLORS: Partial<CandlestickStyleOptions> = {
	upColor: "#20B26C",
	downColor: "#EF454A",
	borderVisible: true,
	wickUpColor: "#20B26C",
	wickDownColor: "#EF454A",
};

export const CHART_OPTIONS = {
	// autoSize: true,
	autoScale: true,
	crosshairMarkerVisible: false,
	crosshairMarkerRadius: 0,
	timeScale: {
		rightOffset: 20,
		timeVisible: true,
		secondsVisible: false,
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
