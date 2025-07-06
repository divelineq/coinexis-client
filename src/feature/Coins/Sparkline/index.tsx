import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useHistory } from "./useHistory";
import { useSparklineOptions } from "./useSparklineOptions";

type Props = {
	id: number;
};

export const Sparkline = ({ id }: Props) => {
	const now = Date.now();
	const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
	const { data } = useHistory(id, sevenDaysAgo, now, "1h");

	const options = useSparklineOptions(
		data?.price_history.map((item) => item?.[1]),
	);

	if (data?.price_history.length === 0) {
		return <div>No data available for the last 7 days</div>;
	}

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
			containerProps={{
				style: {
					width: "100%",
				},
			}}
		/>
	);
};
