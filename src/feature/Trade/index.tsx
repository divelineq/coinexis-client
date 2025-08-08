import { Route } from "../../routes/market/$symbol";
import { Chart } from "./Chart";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { useIntervalState } from "./useIntervalState";

const ORDERBOOK_DEPTH = 50;

function Trade() {
	const { symbol } = Route.useLoaderData();
	const [interval, setInterval] = useIntervalState();
	// const topics = useMemo(
	// 	() => [`tickers.${symbol}`, `orderbook.${ORDERBOOK_DEPTH}.${symbol}`],
	// 	[symbol, interval],
	// );
	// const { orderbook, tickers } = useTradeSocket({ topics });

	return (
		<div className="min-h-screen bg-background">
			<div className="size-full mx-auto grid grid-cols-1 lg:grid-cols-6 gap-2">
				<div className="col-span-1 lg:col-span-5 flex flex-col gap-2">
					{/* <Header symbol={symbol} tickers={tickers} /> */}
					<div className="flex flex-1 ">
						<div className="flex-1 flex flex-col gap-2">
							<div className="flex-1 flex ">
								<div className="flex-1 flex flex-col rounded">
									<div className="flex-1 flex gap-2">
										<Chart
											symbol={symbol}
											interval={interval}
											onIntervalChange={setInterval}
										/>
										{/* <Orderbook orderbook={orderbook} /> */}
									</div>
								</div>
							</div>
							<Footer symbol={symbol} />
						</div>
					</div>
				</div>
				<div className="col-span-1">
					<Sidebar />
				</div>
			</div>
		</div>
	);
}

export { Trade };
