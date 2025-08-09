import type { IChartApi } from "lightweight-charts";

const VISIBLE_BAR = 120;

export function setupVisibleRange(chart: IChartApi, totalBars: number) {
	if (totalBars >= VISIBLE_BAR) {
		setTimeout(() => {
			chart.timeScale().setVisibleLogicalRange({
				from: totalBars - VISIBLE_BAR,
				to: totalBars - 1,
			});
			chart.timeScale().scrollToRealTime();
		}, 0);
	} else {
		chart.timeScale().fitContent();
	}
}
