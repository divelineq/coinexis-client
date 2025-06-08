import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
	currency: string;
	className?: string;
};

export const SparklineChart = ({ currency }: Props) => {
	// const { data } = useHistoryCoin(currency);
	// const options = useSparklineOptions(data);

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={{}}
			containerProps={{
				style: {
					width: "100px",
					height: "30px",
				},
			}}
		/>
	);
};
