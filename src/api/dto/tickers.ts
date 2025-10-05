import { z } from "zod/v4";

export enum TickerCategory {
	Spot = "spot",
	Option = "option",
	Linear = "linear",
	Inverse = "inverse",
}

export const TICKERS_SPOT_VALIDATION_SCHEMA = z.object({
	category: z.literal(TickerCategory.Spot),
	list: z.array(
		z.object({
			symbol: z.string(),
			bid1Price: z.string(),
			bid1Size: z.string(),
			ask1Price: z.string(),
			ask1Size: z.string(),
			lastPrice: z.string(),
			prevPrice24h: z.string(),
			price24hPcnt: z.string(),
			highPrice24h: z.string(),
			lowPrice24h: z.string(),
			turnover24h: z.string(),
			volume24h: z.string(),
			usdIndexPrice: z.string(),
		}),
	),
});

export const TICKERS_OPTION_VALIDATION_SCHEMA = z.object({
	category: z.literal(TickerCategory.Option),
	list: z.array(
		z.object({
			symbol: z.string(),
			bid1Price: z.string(),
			bid1Size: z.string(),
			bid1Iv: z.string(),
			ask1Price: z.string(),
			ask1Size: z.string(),
			ask1Iv: z.string(),
			lastPrice: z.string(),
			highPrice24h: z.string(),
			lowPrice24h: z.string(),
			markPrice: z.string(),
			indexPrice: z.string(),
			markIv: z.string(),
			underlyingPrice: z.string(),
			openInterest: z.string(),
			turnover24h: z.string(),
			volume24h: z.string(),
			totalVolume: z.string(),
			totalTurnover: z.string(),
			delta: z.string(),
			gamma: z.string(),
			vega: z.string(),
			theta: z.string(),
			predictedDeliveryPrice: z.string(),
			change24h: z.string(),
		}),
	),
});

export const TICKERS_INVERSE_VALIDATION_SCHEMA = z.object({
	category: z.literal(TickerCategory.Inverse),
	list: z.array(
		z.object({
			symbol: z.string(),
			lastPrice: z.string(),
			indexPrice: z.string(),
			markPrice: z.string(),
			prevPrice24h: z.string(),
			price24hPcnt: z.string(),
			highPrice24h: z.string(),
			lowPrice24h: z.string(),
			prevPrice1h: z.string(),
			openInterest: z.string(),
			openInterestValue: z.string(),
			turnover24h: z.string(),
			volume24h: z.string(),
			fundingRate: z.string(),
			nextFundingTime: z.string(),
			predictedDeliveryPrice: z.string(),
			basisRate: z.string(),
			basis: z.string(),
			deliveryFeeRate: z.string(),
			deliveryTime: z.string(),
			ask1Size: z.string(),
			bid1Price: z.string(),
			ask1Price: z.string(),
			bid1Size: z.string(),
			preOpenPrice: z.string(),
			preQty: z.string(),
			curPreListingPhase: z.string(),
		}),
	),
});

export const TICKERS_LINEAR_VALIDATION_SCHEMA = z.object({
	category: z.literal(TickerCategory.Linear),
	list: z.array(
		z.object({
			symbol: z.string(),
			lastPrice: z.string(),
			indexPrice: z.string(),
			markPrice: z.string(),
			prevPrice24h: z.string(),
			price24hPcnt: z.string(),
			highPrice24h: z.string(),
			lowPrice24h: z.string(),
			prevPrice1h: z.string(),
			openInterest: z.string(),
			openInterestValue: z.string(),
			turnover24h: z.string(),
			volume24h: z.string(),
			fundingRate: z.string(),
			nextFundingTime: z.string(),
			predictedDeliveryPrice: z.string(),
			basisRate: z.string(),
			basis: z.string(),
			deliveryFeeRate: z.string(),
			deliveryTime: z.string(),
			ask1Size: z.string(),
			bid1Price: z.string(),
			ask1Price: z.string(),
			bid1Size: z.string(),
			preOpenPrice: z.string(),
			preQty: z.string(),
			curPreListingPhase: z.string(),
		}),
	),
});

export const TICKERS_VALIDATION_SCHEMA = z.discriminatedUnion("category", [
	TICKERS_SPOT_VALIDATION_SCHEMA,
	TICKERS_OPTION_VALIDATION_SCHEMA,
	TICKERS_INVERSE_VALIDATION_SCHEMA,
	TICKERS_LINEAR_VALIDATION_SCHEMA,
]);

export type TickersResponse = z.input<typeof TICKERS_VALIDATION_SCHEMA>;

export type TickersSpotResponse = z.input<
	typeof TICKERS_SPOT_VALIDATION_SCHEMA
>;

export type TickersOptionResponse = z.input<
	typeof TICKERS_OPTION_VALIDATION_SCHEMA
>;

export type TickersInverseResponse = z.input<
	typeof TICKERS_INVERSE_VALIDATION_SCHEMA
>;

export type TickersLinearResponse = z.input<
	typeof TICKERS_LINEAR_VALIDATION_SCHEMA
>;
