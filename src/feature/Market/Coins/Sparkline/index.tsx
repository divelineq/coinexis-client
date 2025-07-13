import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSparklineOptions } from "./useSparklineOptions";

type Props = {
	data: number[];
};

export const Sparkline = ({ data }: Props) => {
	if (data?.length === 0) {
		return "No data available for the period";
	}

	const options = useSparklineOptions(data);

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
