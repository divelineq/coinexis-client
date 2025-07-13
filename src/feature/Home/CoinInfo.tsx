import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui";
import { useTicker24H } from "./useGetCoin";

type Props = {
	coin: string;
};

const formatDateTime = (ms: number) =>
	new Date(ms).toLocaleString("ru-RU", {
		dateStyle: "medium",
		timeStyle: "short",
	});

function BestCoinsInfo({ coin }: Props) {
	const { data } = useTicker24H(coin);

	if (!data) {
		return <div>Возможно тут что-то будет...</div>;
	}

	const priceChange = Number.parseFloat(data.priceChange);
	const priceChangePercent = Number.parseFloat(data.priceChangePercent);
	const priceUp = priceChange > 0;
	const priceDown = priceChange < 0;

	const priceChangeColor = priceUp
		? "text-green-600"
		: priceDown
			? "text-red-600"
			: "text-muted-foreground";

	return (
		<Card className="w-full bg-background shadow-lg">
			<CardHeader>
				<CardTitle className="text-xl">{data.symbol} — 24h</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<CardDescription>
						<span className="font-semibold">Последняя цена:</span>{" "}
						{Number(data.lastPrice).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					</CardDescription>
					<CardDescription>
						<span className="font-semibold">Изменение за 24ч:</span>{" "}
						<span className={priceChangeColor}>
							{priceChange} ({priceChangePercent}%)
						</span>
					</CardDescription>
				</div>

				<div>
					<CardDescription>
						<span className="font-semibold">Объём торгов (базовая):</span>{" "}
						{Number.parseFloat(data.volume).toFixed(2)}
					</CardDescription>
					<CardDescription>
						<span className="font-semibold">Объём торгов (котируемая):</span>{" "}
						{Number.parseFloat(data.quoteVolume).toFixed(2)}
					</CardDescription>
				</div>

				<div>
					<CardDescription>
						<span className="font-semibold">Максимум за 24ч:</span>{" "}
						{Number(data.highPrice).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					</CardDescription>
					<CardDescription>
						<span className="font-semibold">Минимум за 24ч:</span>{" "}
						{Number(data.lowPrice).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					</CardDescription>
				</div>

				<div>
					<CardDescription>
						<span className="font-semibold">Открытие:</span>{" "}
						{Number(data.openPrice).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					</CardDescription>
					<CardDescription>
						<span className="font-semibold">Предыдущее закрытие:</span>{" "}
						{Number(data.prevClosePrice).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
					</CardDescription>
				</div>

				<div>
					<CardDescription>
						<span className="font-semibold">Лучшая покупка:</span>{" "}
						{Number(data.bidPrice).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}{" "}
						(объём: {data.bidQty})
					</CardDescription>
					<CardDescription>
						<span className="font-semibold">Лучшая продажа:</span>{" "}
						{Number(data.askPrice).toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}{" "}
						(объём: {data.askQty})
					</CardDescription>
				</div>

				<div>
					<CardDescription>
						<span className="font-semibold">Количество сделок:</span>{" "}
						{data.count}
					</CardDescription>
					<CardDescription>
						<span className="font-semibold">Начало интервала:</span>{" "}
						{formatDateTime(data.openTime)}
					</CardDescription>
					<CardDescription>
						<span className="font-semibold">Конец интервала:</span>{" "}
						{formatDateTime(data.closeTime)}
					</CardDescription>
				</div>
			</CardContent>
			<CardFooter>
				<CardDescription className="flex flex-wrap gap-2">
					{priceUp && <Badge variant="outline">📈 Рост</Badge>}
					{priceDown && <Badge variant="outline">📉 Падение</Badge>}
					{Number(data.quoteVolume) > 10_000_000 && (
						<Badge variant="outline">💸 Активная торговля</Badge>
					)}

					{Number(data.highPrice) / Number(data.lowPrice) - 1 > 0.1 && (
						<Badge variant="outline">⚡ Высокая волатильность</Badge>
					)}

					{Number(data.highPrice) / Number(data.lowPrice) - 1 < 0.02 && (
						<Badge variant="outline">🛌 Низкая волатильность</Badge>
					)}

					{Number(data.count) > 50_000 && (
						<Badge variant="outline">🔥 Популярный актив</Badge>
					)}

					{Number(data.openPrice) > Number(data.prevClosePrice) && (
						<Badge variant="outline">🔼 День начался сильнее</Badge>
					)}

					{Number(data.openPrice) < Number(data.prevClosePrice) && (
						<Badge variant="outline">🔽 Закрылся ростом</Badge>
					)}
				</CardDescription>
			</CardFooter>
		</Card>
	);
}

export { BestCoinsInfo };
