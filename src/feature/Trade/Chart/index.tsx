import { Chart as UiChart } from "@ui";
import { Skeleton } from "./Skeleton";
import { useKline } from "./useKline";
import { useWsKline } from "./useWsKline";

const LIMIT_KLINE = 1000;
const INTERVAL = "1";
const CATEGORY = "spot";

function Chart({ symbol }: { symbol: string }) {
	const { data, isLoading, error } = useKline(
		symbol,
		INTERVAL,
		LIMIT_KLINE,
		CATEGORY,
	);

	const wsKline = useWsKline({ interval: INTERVAL, symbol });

	return (
		<div className="flex-1">
			<div className="size-full rounded flex text-sm">
				{isLoading && <Skeleton width="1200px" height="600px" />}
				{error && <div className="text-red-400">Error: {error.message}</div>}
				{!isLoading && !error && data && (
					<UiChart
						data={data}
						newData={wsKline}
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
