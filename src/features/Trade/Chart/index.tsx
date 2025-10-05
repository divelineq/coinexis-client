import { useWebSocket } from "@hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorScreen, Chart as UiChart } from "@ui";
import type { OhlcData, Time } from "lightweight-charts";
import { useState } from "react";
import type { KlineWsDto } from "../types";
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
		fetchNextPage,
	} = useKline(symbol, interval, LIMIT_KLINE, CATEGORY);

	useWebSocket<KlineWsDto[]>(
		[`kline.${interval}.${symbol}`],
		(_, __, data) =>
			setKline({
				time: Math.floor((data[0].timestamp as number) / 1000) as Time,
				open: +data[0].open,
				close: +data[0].close,
				low: +data[0].low,
				high: +data[0].high,
			}),
		{ enabled: !!historyKline },
	);

	if (error) {
		return (
			<ErrorScreen
				error={error}
				message="Нет данных для отображения данной валюты"
			/>
		);
	}

	return (
		<div className="flex-1 size-full rounded flex text-sm basis-4/5">
			{isLoading && <Skeleton width="100%" height="100%" />}
			{!isLoading && !error && historyKline && (
				<UiChart
					getPrevData={fetchNextPage}
					data={historyKline}
					newData={newKline}
					interval={interval}
					onIntervalChange={(interval) => {
						setInterval(interval);
						queryClient.invalidateQueries({
							queryKey: ["kline", interval, symbol, LIMIT_KLINE, CATEGORY],
						});
					}}
				/>
			)}
			{!isLoading && !error && !historyKline && <div>No data</div>}
		</div>
	);
}

export { Chart };
