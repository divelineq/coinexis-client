import cx from "classix";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useGetCoin } from "./useGetCoin";

type Props = {
	coins: string[];
};

function BestCoinsInfo({ coins }: Props) {
	const { data } = useGetCoin(coins);

	if (!data) {
		return <div>Возможно тут что то будет...</div>;
	}

	return (
		<div className="flex gap-5">
			{data.map((coin) => (
				<div key={coin.id} className="flex gap-1">
					<span>{coin?.symbol}</span>{" "}
					<span
						className={cx(
							coin.price_change_24h > 0 ? "text-green-500" : "text-red-500",
						)}
					>
						<div className="flex items-center">
							<span>
								{coin.price_change_24h > 0 ? (
									<AiFillCaretUp className="w-4 h-4 text-green-500" />
								) : coin.price_change_24h < 0 ? (
									<AiFillCaretDown className="w-4 h-4 text-red-500" />
								) : null}
							</span>
							<span>{coin.price.toFixed(3)}</span>
						</div>
					</span>
				</div>
			))}
		</div>
	);
}

export { BestCoinsInfo };
