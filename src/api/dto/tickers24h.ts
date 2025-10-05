import { z } from "zod/v4";

export const TICKER_24H_VALIDATION_SCHEMA = z.object({
	symbol: z.string(),
	priceChange: z.string(),
	priceChangePercent: z.string(),
	weightedAvgPrice: z.string(),
	prevClosePrice: z.string(),
	lastPrice: z.string(),
	lastQty: z.string(),
	bidPrice: z.string(),
	bidQty: z.string(),
	askPrice: z.string(),
	askQty: z.string(),
	openPrice: z.string(),
	highPrice: z.string(),
	lowPrice: z.string(),
	volume: z.string(),
	quoteVolume: z.string(),
	openTime: z.number().int().nonnegative(),
	closeTime: z.number().int().nonnegative(),
	firstId: z.number().int().nonnegative(),
	lastId: z.number().int().nonnegative(),
	count: z.number().int().nonnegative(),
});

export type Ticker24HResponse = z.input<typeof TICKER_24H_VALIDATION_SCHEMA>;
