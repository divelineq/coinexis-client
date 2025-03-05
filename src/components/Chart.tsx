import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function LineChart() {
	const options = {
		chart: {
			type: "spline",
		},
		title: {
			text: "BTC/USDT",
		},
		series: [
			{
				data: [1, 2, 3, 2, 6, 1, 13, 10],
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export { LineChart };
