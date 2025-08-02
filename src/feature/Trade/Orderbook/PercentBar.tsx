import { useMemo } from "react";
import type { Level } from "../types";

type Props = {
	bids: Level[];
	asks: Level[];
	topN?: number;
};

function PercentBar({ bids, asks, topN = 20 }: Props) {
	const { buyPercent, sellPercent, bidVolume, askVolume } = useMemo(() => {
		const sum = (arr: Level[]) =>
			arr
				.slice(0, topN)
				.reduce((acc, [, size]) => acc + Number.parseFloat(size), 0);
		const bidVolume = sum(bids);
		const askVolume = sum(asks);
		const total = bidVolume + askVolume;
		if (total === 0)
			return { buyPercent: 50, sellPercent: 50, bidVolume, askVolume };
		return {
			buyPercent: (bidVolume / total) * 100,
			sellPercent: (askVolume / total) * 100,
			bidVolume,
			askVolume,
		};
	}, [bids, asks, topN]);

	const buyColor = "var(--buy-color)";
	const sellColor = "var(--sell-color)";
	const neutralBg = "#2a2f4a";

	return (
		<div
			style={{
				width: "100%",
				fontFamily: "system-ui, sans-serif",
				fontSize: 12,
			}}
		>
			<div
				style={{
					position: "relative",
					background: neutralBg,
					borderRadius: 2,
					overflow: "hidden",
					height: "20px",
					display: "flex",
					cursor: "default",
				}}
				title={`Buy: ${buyPercent.toFixed(0)}% (${bidVolume.toFixed(6)}) | Sell: ${sellPercent.toFixed(0)}% (${askVolume.toFixed(6)})`}
			>
				<div
					style={{
						width: `${buyPercent}%`,
						background: buyColor,
						transition: "width .3s ease",
					}}
				/>
				<div
					style={{
						width: `${sellPercent}%`,
						background: sellColor,
						transition: "width .3s ease",
					}}
				/>
				<div
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0 8px",
						color: "#fff",
						fontWeight: 500,
						pointerEvents: "none",
						mixBlendMode: "normal",
						textShadow: "0 0 4px rgba(0,0,0,0.6)",
					}}
				>
					<div>Buy {buyPercent.toFixed(0)}%</div>
					<div>Sell {sellPercent.toFixed(0)}%</div>
				</div>
			</div>
		</div>
	);
}

export { PercentBar };
