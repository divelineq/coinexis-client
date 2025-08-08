import { useWebSocket } from "@hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Chart as UiChart } from "@ui";
import type { OhlcData } from "lightweight-charts";
import { useState } from "react";
import { useIntervalState } from "../useIntervalState";
import { Skeleton } from "./Skeleton";
import { useKline } from "./useKline";

const LIMIT_KLINE = 1000;
const CATEGORY = "spot";

type Props = {
	symbol: string;
};

function Chart({ symbol }: Props) {
	const [interval, setInterval] = useIntervalState();

	const [newKline, setKline] = useState<OhlcData | null>(null);
	const queryClient = useQueryClient();
	const {
		data: historyKline,
		isLoading,
		error,
	} = useKline(symbol, interval, LIMIT_KLINE, CATEGORY);

	useWebSocket(
		[`kline.${interval}.${symbol}`],
		(_, __, data) => {
			setKline({
				time: data[0].start,
				open: +data[0].open,
				close: +data[0].close,
				low: +data[0].low,
				high: +data[0].high,
			});
		},
		{ enabled: !!historyKline },
	);

	return (
		<div className="flex-1">
			<div className="size-full rounded flex text-sm">
				{isLoading && <Skeleton width="1200px" height="600px" />}
				{error && <div className="text-red-400">Error: {error.message}</div>}
				{!isLoading && !error && historyKline && (
					<UiChart
						data={historyKline}
						newData={newKline}
						interval={interval}
						onIntervalChange={(interval) => {
							setInterval(interval);
							queryClient.invalidateQueries({
								queryKey: ["kline", interval, symbol, LIMIT_KLINE, CATEGORY],
							});
						}}
						width="1200px"
						height="600px"
					/>
				)}
				{!isLoading && !error && !historyKline && <div>No data</div>}
			</div>
		</div>
	);
}

export { Chart };
