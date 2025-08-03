import { useQueryClient } from "@tanstack/react-query";
import { Chart as UiChart } from "@ui";
import type { OhlcData } from "lightweight-charts";
import { Skeleton } from "./Skeleton";
import { useKline } from "./useKline";

const LIMIT_KLINE = 1000;
const CATEGORY = "spot";

type Props = {
	symbol: string;
	newKline: OhlcData;
	interval: string;
	onIntervalChange: (interval: string) => void;
};

function Chart({ symbol, newKline, interval, onIntervalChange }: Props) {
	const queryClient = useQueryClient();
	const {
		data: historyKline,
		isLoading,
		error,
	} = useKline(symbol, interval, LIMIT_KLINE, CATEGORY);

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
							onIntervalChange(interval);
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
