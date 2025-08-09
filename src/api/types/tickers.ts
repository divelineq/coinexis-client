import { z } from "zod/v4";

export const TICKERS_VALIDATION_SCHEMA = z.object({
	category: z.string(),
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

export type TickersValidationType = z.infer<typeof TICKERS_VALIDATION_SCHEMA>;
