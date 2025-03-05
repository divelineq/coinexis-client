import { useCounter } from "../state/btc";
import { LineChart } from "./Chart";

const App = () => {
	const count = useCounter((state) => state.count);
	const plus = useCounter((state) => state.increment);
	return (
		<div>
			<h1 className="text-error">BTC</h1>
			<div>how to use btc wallet {count}</div>
			<button onClick={plus}>plus</button>
			<LineChart />
		</div>
	);
};

export { App };
