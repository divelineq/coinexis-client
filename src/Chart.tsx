import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { Trade } from "./App";

type Props = {
	trades: Trade[]
}

function LineChart({ trades }: Props) {
	const options = {
		chart: {
			type: "spline",
		},
		title: {
			text: "BTC/USDT",
		},
		series: [
			{
				data: trades,
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export { LineChart };
