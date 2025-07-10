import { z } from "zod/v4";

export const CATEGORIES_VALIDATION_SCHEMA = z.object({
	name: z.string(),
	market_cap: z.number(),
	market_cap_change_24h: z.number(),
	market_cap_change_7d: z.number(),
});

export type CategoriesType = z.infer<typeof CATEGORIES_VALIDATION_SCHEMA>;
