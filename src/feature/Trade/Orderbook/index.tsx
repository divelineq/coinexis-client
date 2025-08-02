import { OrderbookList } from "./OrderbookList";
import { PercentBar } from "./PercentBar";
import { useOrderbook } from "./useOrderbook";

type Props = { symbol: string; depth: number };

function Orderbook({ symbol, depth }: Props) {
	const orderbook = useOrderbook(symbol, depth);

	return (
		<div className="w-full bg-[#101014] p-2 flex flex-col">
			<div className="text-sm font-semibold mb-2">Order Book</div>
			<div className="flex flex-col gap-2 h-full">
				<div className="w-full flex flex-col justify-between text-[14px] gap-2">
					<div>
						<OrderbookList data={orderbook.bids} color="var(--sell-color)" />
					</div>
					<div>
						<OrderbookList data={orderbook.asks} color="var(--buy-color)" />
					</div>
				</div>
				<div className="mt-2 text-[14px]">
					<PercentBar bids={orderbook.bids} asks={orderbook.asks} />
				</div>
			</div>
		</div>
	);
}

export { Orderbook };
