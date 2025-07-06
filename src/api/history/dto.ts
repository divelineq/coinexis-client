import { z } from "zod/v4";

const nullableTuple = z.array(z.tuple([z.number(), z.number()]).nullable());

export const HISTORY_VALIDATION_SCHEMA = z.object({
	price_history: nullableTuple,
	volume_history: nullableTuple.optional(),
	market_cap_history: nullableTuple.optional(),
	market_cap_diluted_history: nullableTuple.optional(),
	name: z.string().optional(),
	symbol: z.string().optional(),
	blockchain: z.string().optional(),
	address: z.string().optional(),
});

export type HistoryType = z.infer<typeof HISTORY_VALIDATION_SCHEMA>;
