import { SparklineChart } from "./SparklineChart";
import { useGetCurrency } from "./useGetCurrency";

type CurrencyProps = {
	currency: string;
};

export function Currency({ currency }: CurrencyProps) {
	const { value, loading, error } = useGetCurrency(currency);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">{error}</div>
		);
	}

	return (
		<div className="flex gap-4 items-center justify-between p-2 m-4 bg-emerald-800 rounded-md">
			<div className="flex gap-4 items-center">
				<div className="flex gap-2">
					<img src={value?.logo} className="w-6 h-6" aria-label="logo" />
					<p>{value?.name}</p>
				</div>
				<SparklineChart currency={currency} />
				<p>{`$${value?.price.toFixed(2)}`}</p>
				<p>{`1h: ${value?.price_change_1h.toFixed(3)}`}</p>
				<p>{`24h: ${value?.price_change_24h.toFixed(3)}`}</p>
				<p>{`7d: ${value?.price_change_7d.toFixed(3)}`}</p>
				<p>{`1m: ${value?.price_change_1m.toFixed(3)}`}</p>
				<p>{`1y: ${value?.price_change_1y.toFixed(3)}`}</p>
			</div>
			<div>
				<button className="bg-emerald-600 p-2 rounded-sm">View chart</button>
			</div>
		</div>
	);
}
