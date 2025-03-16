import { useCurrency } from "../state/currencyState";
import { useLogin } from "../state/loginState";

export default function Select() {
	const login = useLogin((state) => state.loggedIn);
	const currency = useCurrency((state) => state.currencyName);
	const setCurrency = useCurrency((state) => state.setCurrency);

	return (
		<select
			className={`${login ? "bg-emerald-700" : "bg-emerald-950"} text-emerald-100 p-1 rounded border-none outline-none`}
			value={currency}
			disabled={!login}
			onChange={(el) => {
				setCurrency(el.target.value);
			}}
		>
			<option>BTC</option>
			<option>ETHEREUM</option>
			<option>XRP</option>
			<option>TETHER</option>
			<option>DOGECOIN</option>
		</select>
	);
}
