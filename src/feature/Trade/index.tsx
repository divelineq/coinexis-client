import { Route } from "../../routes/market/$symbol";
import { Chart } from "./Chart";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Orderbook } from "./Orderbook";
import { Sidebar } from "./Sidebar";

function Trade() {
	const { symbol } = Route.useLoaderData();

	//TODO сделать 1 вебсокет с 3 потоками (kline, orderbook, trades)

	return (
		<div className="min-h-screen bg-background">
			<div className="size-full mx-auto grid grid-cols-1 lg:grid-cols-6 gap-2">
				<div className="col-span-1 lg:col-span-5 flex flex-col gap-2">
					<Header symbol={symbol} />
					<div className="flex flex-1 ">
						<div className="flex-1 flex flex-col gap-2">
							<div className="flex-1 flex ">
								<div className="flex-1 flex flex-col rounded">
									<div className="flex-1 flex gap-2">
										<Chart symbol={symbol} />
										<Orderbook symbol={symbol} depth={50} />
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
