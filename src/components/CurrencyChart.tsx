import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
import { useGetHistoryCoin } from "./useGetHistoryCoin";

type Props = {
	currency: string;
};

export function CurrencyChart({ currency }: Props) {
	const data = useGetHistoryCoin(5000, currency);

	const options = useMemo(
		() => ({
			title: {
				text: !data?.name ? "Loading..." : data.name,
			},
			xAxis: {
				labels: {
					enabled: false,
				},
			},
			tooltip: {
				formatter: function (this: any) {
					return `<b>${new Date(this.x).toLocaleDateString("ru-RU")}</b><br/><b>${(this.y).toFixed(2)} $</b>`;
				},
			},
			plotOptions: {
				type: "line",
			},
			legend: { enabled: false },
			series: [
				{
					data: data?.price_history ?? [],
					color: "green",
				},
			],
			chart: {
				zooming: {
					type: "x",
				},
				styleMode: true,
				type: "line",
				style: {
					borderRadius: "6px",
					backgroundColor: "#1e293b",
				},
			},
		}),
		[data],
	);

	return (
		<div className="p-2">
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}
