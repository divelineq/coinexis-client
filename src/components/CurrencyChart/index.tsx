import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useHistoryCoin } from "../../api/useHistoryCoin";
import { useCurrencyOptions } from "./useCurrencyOptions";

type Props = {
	currency: string;
	className?: string;
};

export function CurrencyChart({ currency, className }: Props) {
	const { data, isPending, isError } = useHistoryCoin(currency);

	const options = useCurrencyOptions(data);

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}

	return (
		<div className={className}>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
}
