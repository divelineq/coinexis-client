import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo } from "react";
import { useAppContext } from "../state/useAppContext";

type Props = {
	color?: string;
	currency: string;
};

export const SparklineChart = ({ color, currency }: Props) => {
	const { historyCoin, getHistoryCoin } = useAppContext();

	useEffect(() => {
		getHistoryCoin(currency);
	}, []);

	const options: Highcharts.Options = useMemo(
		() => ({
			chart: {
				type: "line",
				backgroundColor: "transparent",
				borderWidth: 0,
				height: 30,
				margin: [2, 0, 2, 0],
				style: {
					overflow: "visible",
				},
			},
			title: { text: undefined },
			credits: { enabled: false },
			xAxis: { visible: false },
			yAxis: {
				visible: false,
				endOnTick: false,
				startOnTick: false,
			},
			tooltip: { enabled: false },
			legend: { enabled: false },
			series: [
				{
					data: !historyCoin?.coin[currency]?.price_history
						? []
						: historyCoin.coin[currency].price_history.map(
								(el: [number, number]) => el[1],
							),
					type: "line",
					color,
					lineWidth: 1.5,
					marker: { enabled: false },
					enableMouseTracking: false,
				},
			],
		}),
		[historyCoin.coin, color, currency],
	);

	if (!historyCoin?.coin[currency]) {
		return <div>Loading...</div>;
	}

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
			containerProps={{
				style: {
					width: "100px",
					height: "30px",
				},
			}}
		/>
	);
};
