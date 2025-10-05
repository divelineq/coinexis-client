import { useWebSocket } from "@hooks";
import { useEffect, useRef, useState } from "react";
import type { OrderbookType, OrderbookWsDto } from "../types";
import { OrderbookList } from "./OrderbookList";
import { PercentBar } from "./PercentBar";
import { updateOrderbook } from "./updateOrderbook";

type Props = {
	symbol: string;
};

const ORDERBOOK_DEPTH = 50;

function Orderbook({ symbol }: Props) {
	const [orderbook, setOrderbook] = useState<OrderbookType>({
		bids: [],
		asks: [],
	});
	const orderbookRef = useRef<OrderbookType>(orderbook);

	useEffect(() => {
		const interval = setInterval(() => {
			const bids = updateOrderbook(
				orderbookRef.current.bids,
				orderbookRef.current.bids,
				true,
			);
			const asks = updateOrderbook(
				orderbookRef.current.asks,
				orderbookRef.current.asks,
				false,
			);

			setOrderbook({ bids, asks });
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useWebSocket<OrderbookWsDto>(
		[`orderbook.${ORDERBOOK_DEPTH}.${symbol}`],
		(_, type, data) => {
			if (type === "snapshot") {
				setOrderbook({ bids: data.b, asks: data.a });
				return;
			}

			orderbookRef.current = {
				bids: updateOrderbook(orderbookRef.current.bids, data.b, false),
				asks: updateOrderbook(orderbookRef.current.asks, data.a, true),
			};
		},
	);

	return (
		<div className="size-full bg-[#101014] p-2 flex flex-col basis-1/5">
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
