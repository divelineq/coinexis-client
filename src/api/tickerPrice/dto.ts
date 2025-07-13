import { z } from "zod/v4";

export const TICKER_PRICE_SYMBOL_VALIDATION_SCHEMA = z.object({
	symbol: z.string(),
	price: z.string(),
});

export type TickerPriceSymbolType = z.infer<
	typeof TICKER_PRICE_SYMBOL_VALIDATION_SCHEMA
>;
