import { Route } from "../../routes/market/$category/$symbol";
import { Chart } from "./Chart";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Orderbook } from "./Orderbook";
import { Sidebar } from "./Sidebar";

function Trade() {
	const { symbol } = Route.useLoaderData();

	return (
		<div className="h-[70vh] bg-background">
			<div className="size-full flex flex-col 2xl:flex-row gap-2">
				<div className="basis-5/6 flex flex-col gap-2 ">
					<Header symbol={symbol} />
					<div className="flex flex-col flex-1 h-full gap-2">
						<div className="flex flex-col 2xl:flex-row flex-1 h-full gap-2">
							<Chart symbol={symbol} />
							<Orderbook symbol={symbol} />
						</div>
						<Footer symbol={symbol} />
					</div>
				</div>
				<Sidebar />
			</div>
		</div>
	);
}

export { Trade };
