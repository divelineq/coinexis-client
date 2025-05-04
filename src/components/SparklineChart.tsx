import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo } from "react";
import { useHistoryCoin } from "../state/useHistoryCoin";

type Props = {
	color?: string;
	currency: string;
	className?: string;
};

export const SparklineChart = ({ color, currency, className }: Props) => {
	const { coin, error, loading, getHistoryCoin } = useHistoryCoin();

	useEffect(() => {
		getHistoryCoin(currency);
	}, []);

	const options: Highcharts.Options = useMemo(
		() => ({
			boost: {
				enabled: true,
				seriesThreshold: 1,
				usePreallocated: true,
			},
			chart: {
				type: "spline",
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
					data: !coin[currency]?.price_history
						? []
						: coin[currency].price_history.map((el: [number, number]) => el[1]),
					type: "spline",
					color,
					lineWidth: 1.5,
					animation: false,
					marker: { enabled: false },
					enableMouseTracking: false,
				},
			],
		}),
		[coin, color, currency],
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<HighchartsReact
			className={className}
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
