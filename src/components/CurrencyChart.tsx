import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useCurrency } from "../state/currencyState";

export default function CurrencyChart() {
	const name = useCurrency((state) => state.currencyName);

	const options = {
		title: {
			text: name,
		},
		xAxis: {
			title: {
				name: "Time",
			},
			categories: ["1", "2", "3", "4", "5"],
		},
		yAxis: {
			title: {
				name: "Price",
			},
		},
		plotOptions: {
			type: "line",
		},
		series: [{ data: [1, 2, 3, 4, 5], color: "green" }],
		chart: {
			styleMode: true,
			type: "line",
			style: {
				borderRadius: "6px",
				background: "red",
			},
		},
	};

	return (
		<div className="p-2">
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}
