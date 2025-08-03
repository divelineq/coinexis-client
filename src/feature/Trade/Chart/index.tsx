import { useQueryClient } from "@tanstack/react-query";
import { Chart as UiChart } from "@ui";
import { useState } from "react";
import { Skeleton } from "./Skeleton";
import { useKline } from "./useKline";
import { useWsKline } from "./useWsKline";

const LIMIT_KLINE = 1000;
const CATEGORY = "spot";
const DEFAULT_INTERVAL = "1";

type Props = {
	symbol: string;
};

function Chart({ symbol }: Props) {
	const [interval, setInterval] = useState(DEFAULT_INTERVAL);
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useKline(
		symbol,
		interval,
		LIMIT_KLINE,
		CATEGORY,
	);

	const wsKline = useWsKline({ interval, symbol });

	return (
		<div className="flex-1">
			<div className="size-full rounded flex text-sm">
				{isLoading && <Skeleton width="1200px" height="600px" />}
				{error && <div className="text-red-400">Error: {error.message}</div>}
				{!isLoading && !error && data && (
					<UiChart
						data={data}
						newData={wsKline}
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
				{!isLoading && !error && !data && <div>No data</div>}
			</div>
		</div>
	);
}

export { Chart };
