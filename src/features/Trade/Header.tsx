import { useWebSocket } from "@hooks";
import cx from "classix";
import { useState } from "react";
import type { TickersWsDto } from "./types";

type Props = {
	symbol: string;
};

function Header({ symbol }: Props) {
	const [tickers, setTickers] = useState<TickersWsDto | null>(null);

	useWebSocket<TickersWsDto>([`tickers.${symbol}`], (_, __, data) => {
		setTickers(data);
		document.title = `${symbol} | ${Number(data.lastPrice).toLocaleString(
			"en-US",
			{
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			},
		)}`;
	});

	return (
		<div className="flex items-center justify-start px-4 py-2 bg-[#101014]">
			<div className="flex flex-col  border-r border-white/50 px-6 ">
				<div className="font-bold text-md">{symbol}</div>
			</div>
			{tickers && (
				<div className="pl-2 flex gap-8 items-center">
					<div>
						<p
							className={cx(
								Number(tickers.price24hPcnt) > 0
									? "text-buy"
									: Number(tickers.price24hPcnt) < 0
										? "text-sell"
										: "text-white",
								"font-mono",
							)}
						>
							{Number(tickers.lastPrice).toFixed(1)}
						</p>
						<p className="text-md text-white/50 font-mono">
							{Number(tickers.lastPrice).toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}{" "}
							USD
						</p>
					</div>
					<div>
						<p className="text-xs text-white/50">24H Change</p>
						<p
							className={cx(
								Number(tickers.price24hPcnt) > 0
									? "text-buy"
									: Number(tickers.price24hPcnt) < 0
										? "text-sell"
										: "text-white",
								"text-md font-mono",
							)}
						>
							{Number(tickers.price24hPcnt) > 0 ? "+" : "-"}
							{Number(
								((Number(tickers.lastPrice) - Number(tickers.prevPrice24h)) /
									Number(tickers.prevPrice24h)) *
									100,
							).toFixed(2)}
							%
						</p>
					</div>
					<div>
						<p className="text-xs text-white/50">24H High</p>
						<p className="text-md font-mono">
							{Number(tickers.highPrice24h).toLocaleString("en-US")}
						</p>
					</div>
					<div>
						<p className="text-xs text-white/50">24H Low</p>
						<p className="text-md font-mono">
							{Number(tickers.lowPrice24h).toLocaleString("en-US")}
						</p>
					</div>
					<div>
						<p className="text-xs text-white/50">24H Turnover</p>
						<p className="text-md  font-mono">
							{Number(tickers.turnover24h).toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</p>
					</div>
					<div>
						<p className="text-xs text-white/50">24H Volume</p>
						<p className="text-md font-mono">
							{Number(tickers.volume24h).toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export { Header };
