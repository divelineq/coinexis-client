import { Link } from "@tanstack/react-router";
import { useCurrencyCoin } from "../api/useCurrencyCoin";
import { SparklineChart } from "./SparklineChart";

type Props = {
	currency: string;
};

export function InfoCurrency({ currency }: Props) {
	const { data } = useCurrencyCoin(currency);

	return (
		<div
			style={{ backgroundColor: "rgb(57, 62, 70)" }}
			className="flex gap-4 items-center justify-between p-2 m-4 rounded-md"
		>
			<div className="flex gap-4 items-center">
				<div className="flex gap-2">
					<img
						src={data.logo || "jopajopa"}
						className="w-6 h-6"
						aria-label="logo"
					/>
					<p>{data.name}</p>
				</div>
				<SparklineChart currency={currency} />
				<p
					className={`${data.price_change_24h > 0 ? "text-green-500" : "text-red-500"}`}
				>{`$${data.price.toFixed(2)}`}</p>
				<p>{`1h: ${data.price_change_1h.toFixed(3)}`}</p>
				<p>{`24h: ${data.price_change_24h.toFixed(3)}`}</p>
				<p>{`7d: ${data.price_change_7d.toFixed(3)}`}</p>
				<p>{`1m: ${data.price_change_1m.toFixed(3)}`}</p>
				<p>{`1y: ${data.price_change_1y.toFixed(3)}`}</p>
			</div>
			<div>
				<Link to="/charts/$coin" params={{ coin: currency }}>
					<button
						style={{ backgroundColor: "rgb(50, 130, 184)" }}
						className=" p-2 rounded-sm cursor-pointer"
					>
						Посмотреть график
					</button>
				</Link>
			</div>
		</div>
	);
}
